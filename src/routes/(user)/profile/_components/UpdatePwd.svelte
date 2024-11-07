<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { Loader } from 'lucide-svelte';
  import { updatePwdSchema, type UpdatePwdSchema } from '../profile-schema';
  import type { User } from '@supabase/supabase-js';
  import { fromUserState } from '../../../_states/fromUserState.svelte';

  interface Props {
    updatePwdForm: SuperValidated<Infer<UpdatePwdSchema>>;
  }

  const { updatePwdForm }: Props = $props();

  const user = fromUserState();

  const form = superForm(updatePwdForm, {
    validators: zodClient(updatePwdSchema),
    id: crypto.randomUUID(),
    onUpdate({ result }) {
      const { status, data } = result as Result<{ msg: string; user: User }>;

      switch (status) {
        case 200:
          toast.success('', { description: data.msg });
          user.setUser(data.user);
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
    <form method="POST" action="?/updatePwdEvent" use:enhance class="flex flex-col gap-[1rem]">
      <p class="text-xl font-semibold">Security Information</p>
      <div class="grid gap-[1rem] md:grid-cols-2">
        <Form.Field {form} name="pwd">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>New Password</Form.Label>
              <Input
                type="password"
                {...props}
                bind:value={$formData.pwd}
                placeholder="Enter your new password"
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="confirmPwd">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Confirm New Password</Form.Label>
              <Input
                type="password"
                {...props}
                bind:value={$formData.confirmPwd}
                placeholder="Confirm your new password"
              />
            {/snippet}
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
            Update Password
          </Form.Button>
        </div>
      </div>
    </form>
  </div>
</div>
