<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { Loader } from 'lucide-svelte';
  import bg_photo from '$lib/assets/bg_landing.jpg?enhanced';
  import { fromStaticRouteState } from '../../../_states/fromStaticRouteState.svelte';
  import { recUpdatePwdSchema } from './update-password-schema';
  import { goto } from '$app/navigation';

  const { data } = $props();

  const staticRoute = fromStaticRouteState();
  staticRoute.setRoute('/authenticate');

  const form = superForm(data.recUpdatePwdForm, {
    validators: zodClient(recUpdatePwdSchema),
    id: crypto.randomUUID(),
    invalidateAll: false,
    onUpdate({ result }) {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success('', { description: data.msg });
          goto('/?msg=password-updated');
          break;

        case 401:
          toast.error('', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;
</script>

<div class="grid h-screen md:grid-cols-[40%,1fr]">
  <div class="hidden md:block">
    <enhanced:img src={bg_photo} alt="" class="h-full w-full"></enhanced:img>
  </div>

  <div class="">
    <div class="flex min-h-screen flex-col justify-center p-[1rem]">
      <div class="">
        <form
          method="POST"
          action="?/recUpdatePwdEvent"
          use:enhance
          class="mx-auto flex max-w-[450px] flex-col gap-[1rem]"
        >
          <div class="mx-auto">
            <p class="text-center text-4xl font-bold">Update Password</p>
            <p class="text-center leading-7 text-muted-foreground">
              Please do not share your password to anyone!
            </p>
          </div>
          <Form.Field {form} name="newPwd">
            <Form.Control let:attrs>
              <Form.Label>New Password</Form.Label>
              <Input
                type="password"
                {...attrs}
                bind:value={$formData.newPwd}
                placeholder="Enter your new password"
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="confirmNewPwd">
            <Form.Control let:attrs>
              <Form.Label>Confirm New Password</Form.Label>
              <Input
                type="password"
                {...attrs}
                bind:value={$formData.confirmNewPwd}
                placeholder="Confirm your new password"
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
            Update Password
          </Form.Button>
        </form>
      </div>
    </div>
  </div>
</div>
