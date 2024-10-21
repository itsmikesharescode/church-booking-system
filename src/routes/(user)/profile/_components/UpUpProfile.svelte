<script lang="ts">
  import { CircleUser } from 'lucide-svelte';
  import * as Form from '$lib/components/ui/form';
  import { type SuperValidated, type Infer, superForm, fileProxy } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { Loader } from 'lucide-svelte';
  import { upUpProfileSchema, type UpUpProfileSchema } from '../profile-schema';
  import type { User } from '@supabase/supabase-js';
  import { fromUserState } from '../../../_states/fromUserState.svelte';
  import { publicProfileAPI } from '$lib';
  import { fromCachingState } from '../../../_states/fromCachingState.svelte';

  interface Props {
    upUpProfileForm: SuperValidated<Infer<UpUpProfileSchema>>;
  }

  const { upUpProfileForm }: Props = $props();

  const user = fromUserState();
  const caching = fromCachingState();

  const form = superForm(upUpProfileForm, {
    validators: zodClient(upUpProfileSchema),
    id: crypto.randomUUID(),
    invalidateAll: false,
    onUpdate({ result }) {
      const { status, data } = result as Result<{ msg: string; user: User }>;

      switch (status) {
        case 200:
          toast.success('', { description: data.msg });
          user.setUser(data.user);
          caching.setCaching(crypto.randomUUID());
          break;

        case 401:
          toast.error('', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  let previewUrl: string | null = $state(null);

  const readImage = () => {
    const reader = new FileReader();
    if ($formData.profilePhoto) {
      reader.onload = () => {
        previewUrl = reader.result as string;
      };
      reader.readAsDataURL($formData.profilePhoto);
    }
  };

  $effect(() => {
    if (user.getUser()?.user_metadata.avatarLink) {
      previewUrl = `${publicProfileAPI + user.getUser()?.user_metadata.avatarLink}?${caching.getCaching()}`;
    }
  });
</script>

<div class="">
  {#if previewUrl}
    <img
      src={previewUrl}
      alt=""
      class="mx-auto h-[10rem] w-[10rem] rounded-full md:h-[15rem] md:w-[15rem]"
    />
  {:else}
    <CircleUser class="mx-auto h-[10rem] w-[10rem] md:h-[15rem] md:w-[15rem]" />
  {/if}

  <form
    method="POST"
    action="?/upUpProfileEvent"
    enctype="multipart/form-data"
    use:enhance
    class="mx-auto flex max-w-[450px] flex-col gap-[1rem]"
  >
    <Form.Field {form} name="profilePhoto">
      <Form.Control let:attrs>
        <div class="flex justify-center">
          <label>
            <span class="cursor-pointer underline transition-all hover:text-red-500"
              >Change Avatar</span
            >
            <input
              class="hidden"
              {...attrs}
              type="file"
              accept="image/png, image/jpeg, image/gif"
              onchange={readImage}
              oninput={(e) => ($formData.profilePhoto = e.currentTarget.files?.item(0) as File)}
            />
          </label>
        </div>
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    {#if previewUrl}
      <Form.Button disabled={$submitting} class="relative">
        {#if $submitting}
          <div
            class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-sm bg-primary"
          >
            <Loader class="h-[15px] w-[15px] animate-spin" />
          </div>
        {/if}
        Update Avatar
      </Form.Button>
    {/if}
  </form>
</div>
