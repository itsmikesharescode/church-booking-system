<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { type SuperValidated, type Infer, superForm, fileProxy } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { Loader } from 'lucide-svelte';
  import { upUpProfileSchema, type UpUpProfileSchema } from '../profile-schema';
  import type { User } from '@supabase/supabase-js';
  import { fromUserState } from '../../../_states/fromUserState.svelte';
  import ImagePicker from '$lib/components/gen/ImagePicker.svelte';

  interface Props {
    upUpProfileForm: SuperValidated<Infer<UpUpProfileSchema>>;
  }

  const { upUpProfileForm }: Props = $props();

  const user = fromUserState();

  const form = superForm(upUpProfileForm, {
    validators: zodClient(upUpProfileSchema),
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

  const file = fileProxy(form, 'profilePhoto');
</script>

<div class="flex max-w-[700px] flex-col p-[1rem]">
  <form
    method="POST"
    action="?/upUpProfileEvent"
    enctype="multipart/form-data"
    use:enhance
    class="flex flex-col gap-[1rem]"
  >
    <p class="text-xl font-semibold">Profile Picture</p>

    <Form.Field {form} name="profilePhoto">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Photo</Form.Label>
          <ImagePicker name="Upload Here" class="" bind:imageLink={$formData.profilePhoto} />
          <input class="hidden" type="file" {...props} bind:files={$file} />
        {/snippet}
      </Form.Control>
      <Form.Description />
      <Form.FieldErrors />
    </Form.Field>

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
          Upload
        </Form.Button>
      </div>
    </div>
  </form>
</div>
