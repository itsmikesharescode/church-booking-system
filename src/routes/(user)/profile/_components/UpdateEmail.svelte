<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { Loader } from 'lucide-svelte';
  import { updateEmailSchema, type UpdateEmailSchema } from '../profile-schema';

  interface Props {
    updateEmailForm: SuperValidated<Infer<UpdateEmailSchema>>;
  }

  const { updateEmailForm }: Props = $props();

  const form = superForm(updateEmailForm, {
    validators: zodClient(updateEmailSchema),
    id: crypto.randomUUID(),
    invalidateAll: false,
    onUpdate({ result }) {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success('', { description: data.msg });

          break;

        case 401:
          toast.error('', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;
</script>

<div class="mx-auto flex max-w-[700px] flex-col justify-center p-[1rem]">
  <div class="">
    <form method="POST" action="?/updateEmailEvent" use:enhance class="flex flex-col gap-[1rem]">
      <p class="text-xl font-semibold">Security Information</p>
      <div class="grid gap-[1rem] md:grid-cols-2">
        <Form.Field {form} name="email">
          <Form.Control let:attrs>
            <Form.Label>New Email</Form.Label>
            <Input {...attrs} bind:value={$formData.email} placeholder="Enter your new email" />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="confirmEmail">
          <Form.Control let:attrs>
            <Form.Label>Confirm New Email</Form.Label>
            <Input
              {...attrs}
              bind:value={$formData.confirmEmail}
              placeholder="Confirm your new email"
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>

      <div class="flex items-center justify-center">
        <div class="w-full max-w-[450px]">
          <Form.Button disabled={$submitting} class="relative w-full">
            {#if $submitting}
              <div
                class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-sm bg-primary"
              >
                <Loader class="h-[15px] w-[15px] animate-spin" />
              </div>
            {/if}
            Update Email
          </Form.Button>
        </div>
      </div>
    </form>
  </div>
</div>
