<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { signInSchema, type SignInSchema } from '../authenticate-schema';
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { Loader } from 'lucide-svelte';

  interface Props {
    signInForm: SuperValidated<Infer<SignInSchema>>;
  }

  const { signInForm }: Props = $props();

  const form = superForm(signInForm, {
    validators: zodClient(signInSchema),
    id: crypto.randomUUID(),
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
      action="?/signInEvent"
      use:enhance
      class="mx-auto flex max-w-[450px] flex-col gap-[1rem]"
    >
      <div class="mx-auto">
        <p class="text-center text-6xl font-bold">Sign In</p>
        <p class="text-center leading-7 text-muted-foreground">Sign in to church booking system</p>
      </div>
      <Form.Field {form} name="email">
        <Form.Control let:attrs>
          <Form.Label>Email</Form.Label>
          <Input {...attrs} bind:value={$formData.email} placeholder="Enter your email" />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="pwd">
        <Form.Control let:attrs>
          <Form.Label>Password</Form.Label>
          <Input
            type="password"
            {...attrs}
            bind:value={$formData.pwd}
            placeholder="Enter your password"
          />
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
        Sign In
      </Form.Button>

      <div class="flex items-center gap-[0.625rem]">
        <div class="h-[1px] w-full bg-slate-400"></div>
        <span>Or</span>
        <div class="h-[1px] w-full bg-slate-400"></div>
      </div>

      <Button href="/authenticate?q=sign-up">Sign Up Free</Button>
      <Button href="/authenticate?q=forgot-password" variant="secondary">Forgot Password</Button>
    </form>
  </div>
</div>
