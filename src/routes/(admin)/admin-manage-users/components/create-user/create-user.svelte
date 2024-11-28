<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import type { Result, UserType } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import Loader from 'lucide-svelte/icons/loader';

  import SelectPicker from '$lib/components/gen/SelectPicker.svelte';
  import { createUserSchema, type CreateUserSchema } from './schema';

  interface Props {
    createUserForm: SuperValidated<Infer<CreateUserSchema>>;
  }

  const { createUserForm }: Props = $props();

  let open = $state(false);

  const form = superForm(createUserForm, {
    validators: zodClient(createUserSchema),
    id: 'create-user-form',
    onUpdate({ result }) {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success(data.msg);

          form.reset();
          open = false;
          break;

        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  const selectedGender = $derived(
    $formData.gender ? { label: $formData.gender, value: $formData.gender } : undefined
  );
</script>

<Button onclick={() => (open = true)}>Create User</Button>

<AlertDialog.Root bind:open>
  <AlertDialog.Content class="flex max-h-screen max-w-[800px] flex-col gap-[0.625rem] p-0">
    <AlertDialog.Header class="p-[1rem] sm:p-[2rem]">
      <AlertDialog.Title>Create User Account</AlertDialog.Title>
      <AlertDialog.Description>Answer the fields to create account</AlertDialog.Description>
    </AlertDialog.Header>

    <form
      method="POST"
      action="?/createUserEvent"
      use:enhance
      class="flex flex-col gap-[1rem] overflow-auto px-[1rem] sm:px-[2rem]"
    >
      <div class="grid gap-[1rem] md:grid-cols-2">
        <Form.Field {form} name="firstName">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>First Name</Form.Label>
              <Input
                {...props}
                bind:value={$formData.firstName}
                placeholder="Enter your first name"
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
                placeholder="Enter your middle name"
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
                placeholder="Enter your last name"
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="gender">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Gender</Form.Label>
              <SelectPicker
                placeholder="Select a gender"
                selections={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' }
                ]}
                {...props}
                bind:selected={$formData.gender}
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

        <Form.Field {form} name="email">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Email</Form.Label>
              <Input {...props} bind:value={$formData.email} placeholder="Enter your email" />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="pwd">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Password</Form.Label>
              <Input
                type="password"
                {...props}
                bind:value={$formData.pwd}
                placeholder="Enter your password"
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="confirmPwd">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Confirm Password</Form.Label>
              <Input
                type="password"
                {...props}
                bind:value={$formData.confirmPwd}
                placeholder="Confirm your password"
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>

      <AlertDialog.Footer class="gap-[0.625rem] pb-[1rem] sm:gap-0 sm:pb-[2rem]">
        <Button
          variant="secondary"
          onclick={() => {
            open = false;
            form.reset();
          }}
        >
          Cancel
        </Button>
        <Form.Button disabled={$submitting} class="relative">
          {#if $submitting}
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-sm bg-primary"
            >
              <Loader class="h-[15px] w-[15px] animate-spin" />
            </div>
          {/if}
          Create Account
        </Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
