<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { forgotPwdSchema, type ForgotPwdSchema } from '../authenticate-schema';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { Loader } from 'lucide-svelte';

  interface Props {
    forgotPwdForm: SuperValidated<Infer<ForgotPwdSchema>>;
  }

  const { forgotPwdForm }: Props = $props();

  const form = superForm(forgotPwdForm, {
    validators: zodClient(forgotPwdSchema),
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

<div class="flex min-h-screen flex-col justify-center p-[1rem]">
  <div class="">
    <form
      method="POST"
      action="?/forgotPwdEvent"
      use:enhance
      class="mx-auto flex max-w-[300px] flex-col gap-[1rem]"
    >
      <div class="flex flex-col gap-2.5">
        <p class="text-center text-3xl font-bold">Forgot Password</p>
        <p class="text-center text-sm leading-7 text-muted-foreground">
          No problem. Just enter your email and we'll send you a link to reset
        </p>
      </div>

      <Form.Field {form} name="email">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Email</Form.Label>
            <Input
              type="email"
              {...props}
              bind:value={$formData.email}
              placeholder="Enter your email"
            />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Button disabled={$submitting} class="relative">
        {#if $submitting}
          <div
            class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-sm bg-primary"
          >
            <Loader class="h-[15px] w-[15px] animate-spin" />
          </div>
        {/if}
        Send Reset Link
      </Form.Button>

      <Button href="/authenticate">Sign In Here</Button>
    </form>
  </div>
</div>
