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
  import { useTableState } from '../table/tableState.svelte';
  import { updateUserSchema, type UpdateUserSchema } from './schema';
  import SelectPicker from '$lib/components/gen/SelectPicker.svelte';

  const tableState = useTableState();

  interface Props {
    updateUserForm: SuperValidated<Infer<UpdateUserSchema>>;
  }

  const { updateUserForm }: Props = $props();

  const form = superForm(updateUserForm, {
    validators: zodClient(updateUserSchema),
    id: 'updateUserForm',
    onUpdate({ result }) {
      const { status, data } = result as Result<{ msg: string; data: UserType[] }>;
      switch (status) {
        case 200:
          toast.success(data.msg);
          form.reset();
          tableState.setActiveRow(null);
          tableState.setShowUpdate(false);
          break;

        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  $effect(() => {
    if (tableState.getActiveRow()) {
      $formData.userId = tableState.getActiveRow()?.user_id ?? '';
      $formData.firstName = tableState.getActiveRow()?.first_name ?? '';
      $formData.middleName = tableState.getActiveRow()?.middle_name ?? '';
      $formData.lastName = tableState.getActiveRow()?.last_name ?? '';
      $formData.gender = tableState.getActiveRow()?.gender ?? '';
      $formData.mobileNum = tableState.getActiveRow()?.mobile_number ?? '';
      $formData.email = tableState.getActiveRow()?.email ?? '';
    }
  });
</script>

<AlertDialog.Root open={tableState.getShowUpdate()}>
  <AlertDialog.Content class="flex max-h-screen max-w-[800px] flex-col gap-[0.625rem] p-0">
    <AlertDialog.Header class="p-[1rem] sm:p-[2rem]">
      <AlertDialog.Title>Update User Details</AlertDialog.Title>
      <AlertDialog.Description>Answer the fields to update</AlertDialog.Description>
    </AlertDialog.Header>

    <form
      method="POST"
      action="?/updateUserEvent"
      use:enhance
      class="flex flex-col gap-[1rem] overflow-auto px-[1rem] sm:px-[2rem]"
    >
      <div class="grid gap-[1rem] md:grid-cols-2">
        <input hidden bind:value={$formData.userId} name="userId" />

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
                {...props}
                selections={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' }
                ]}
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
            tableState.setActiveRow(null);
            tableState.setShowUpdate(false);
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
          Update
        </Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
