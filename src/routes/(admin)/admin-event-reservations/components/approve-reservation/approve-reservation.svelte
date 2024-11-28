<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import type { Result } from '$lib/types';
  import X from 'lucide-svelte/icons/x';
  import Loader from 'lucide-svelte/icons/loader';
  import { toast } from 'svelte-sonner';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { approveSchema, type ApproveSchema } from './schema';
  import { useTableState } from '../table/tableState.svelte';

  interface Props {
    approveForm: SuperValidated<Infer<ApproveSchema>>;
  }

  const { approveForm }: Props = $props();

  const tableState = useTableState();

  const form = superForm(approveForm, {
    validators: zodClient(approveSchema),
    id: 'approve-reservation',
    async onUpdate({ result }) {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success(data.msg);
          form.reset();
          tableState.setActiveRow(null);
          tableState.setShowApprove(false);
          break;
        case 401:
          toast.error(data.msg);
          form.reset();
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  $effect(() => {
    if (tableState.getActiveRow()) {
      $formData.bookId = tableState.getActiveRow()?.id ?? 0;
      $formData.price = tableState.getActiveRow()?.price ?? 0;
    }
  });
</script>

<AlertDialog.Root open={tableState.getShowApprove()}>
  <AlertDialog.Content>
    <button
      onclick={() => {
        tableState.setActiveRow(null);
        tableState.setShowApprove(false);
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    >
      <X />
      <span class="sr-only">Close</span>
    </button>

    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>Enter the price to approve this booking.</AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" action="?/approveBookingEvent" use:enhance class="flex flex-col gap-[1rem]">
      <input name="bookId" type="hidden" bind:value={$formData.bookId} />
      <Form.Field {form} name="price">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Price</Form.Label>
            <Input type="number" {...props} bind:value={$formData.price} />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <AlertDialog.Footer class="gap-[0.625rem] sm:gap-0">
        <Form.Button disabled={$submitting} class="relative">
          {#if $submitting}
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-sm bg-primary"
            >
              <Loader class="h-[15px] w-[15px] animate-spin" />
            </div>
          {/if}

          Approve
        </Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
