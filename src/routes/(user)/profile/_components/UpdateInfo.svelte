<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Select from '$lib/components/ui/select/index.js';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { Loader } from 'lucide-svelte';
  import { updateInfoSchema, type UpdateInfoShema } from '../profile-schema';
  import SelectPicker from '$lib/components/gen/SelectPicker.svelte';
  import { fromUserState } from '../../../_states/fromUserState.svelte';
  import { z } from 'zod';
  import type { User } from '@supabase/supabase-js';
  import CalendarPicker from '$lib/components/gen/CalendarPicker.svelte';

  interface Props {
    updateInfoForm: SuperValidated<Infer<UpdateInfoShema>>;
  }

  const { updateInfoForm }: Props = $props();

  const user = fromUserState();

  const form = superForm(updateInfoForm, {
    validators: zodClient(updateInfoSchema),
    id: crypto.randomUUID(),
    invalidateAll: false,
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
    },
    onUpdated() {
      $formData = { ...(user.getUser()?.user_metadata as z.infer<typeof updateInfoSchema>) };
    }
  });

  const { form: formData, enhance, submitting } = form;

  const selectedGender = $derived(
    $formData.gender ? { label: $formData.gender, value: $formData.gender } : undefined
  );

  $effect(() => {
    $formData = { ...(user.getUser()?.user_metadata as z.infer<typeof updateInfoSchema>) };
  });
</script>

<div class="mx-auto flex max-w-[700px] flex-col justify-center p-[1rem]">
  <div class="">
    <form method="POST" action="?/updateInfoEvent" use:enhance class="flex flex-col gap-[1rem]">
      <p class="text-xl font-semibold">Personal Information</p>
      <div class="grid gap-[1rem] md:grid-cols-2">
        <Form.Field {form} name="firstName">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>First Name</Form.Label>
              <Input
                {...props}
                bind:value={$formData.firstName}
                placeholder="Enter your new first name"
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="middleName">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Middle Name</Form.Label>
              <Input
                {...props}
                bind:value={$formData.middleName}
                placeholder="Enter your new middle name"
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="lastName">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Last Name</Form.Label>
              <Input
                {...props}
                bind:value={$formData.lastName}
                placeholder="Enter your new last name"
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="birthDate">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Birth Date</Form.Label>
              <CalendarPicker type="single" bind:valueString={$formData.birthDate} />
              <input hidden bind:value={$formData.birthDate} name={props.name} />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="gender">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Gender</Form.Label>
              <SelectPicker
                name="Select Gender"
                selections={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' }
                ]}
                selected={$formData.gender}
              />
              <input hidden bind:value={$formData.gender} name={props.name} />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="mobileNum">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Mobile Number</Form.Label>
              <Input
                {...props}
                bind:value={$formData.mobileNum}
                placeholder="Enter your mobile number"
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
            Update Information
          </Form.Button>
        </div>
      </div>
    </form>
  </div>
</div>
