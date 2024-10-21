<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import type { AdminQType, Result } from '$lib/types';
  import { Loader } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { approveSchema, type ApproveSchema } from './event-schema';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';

  interface Props {
    approveSignal: boolean;
    approveForm: SuperValidated<Infer<ApproveSchema>>;
    booking: AdminQType['bookings'][number];
  }

  let { approveSignal = $bindable(), ...props }: Props = $props();

  const form = superForm(props.approveForm, {
    validators: zodClient(approveSchema),
    id: crypto.randomUUID(),
    async onUpdate({ result }) {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success('', { description: data.msg });
          form.reset();
          approveSignal = false;
          break;
        case 401:
          toast.error('', { description: data.msg });
          form.reset();
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;
</script>

<AlertDialog.Root bind:open={approveSignal}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>Enter the price to approve this booking.</AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" action="?/approveBookingEvent" use:enhance class="flex flex-col gap-[1rem]">
      <Form.Field {form} name="bookId" class="hidden">
        <Form.Control let:attrs>
          <Input {...attrs} value={props.booking.id} />
        </Form.Control>
      </Form.Field>

      <Form.Field {form} name="price">
        <Form.Control let:attrs>
          <Form.Label>Price</Form.Label>
          <Input
            type="number"
            {...attrs}
            bind:value={$formData.price}
            placeholder="Enter the price."
          />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <AlertDialog.Footer class="gap-[0.625rem] sm:gap-0">
        <Button
          type="button"
          variant="secondary"
          onclick={() => {
            form.reset();
            approveSignal = false;
          }}>Cancel</Button
        >
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
