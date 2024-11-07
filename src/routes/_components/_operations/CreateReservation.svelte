<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { reservationSchema, type ReservationSchema } from './schema';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { ChurchType, Result, UserQType } from '$lib/types';
  import Textarea from '$lib/components/ui/textarea/textarea.svelte';
  import { fromUserState } from '../../_states/fromUserState.svelte';
  import { goto } from '$app/navigation';
  import { Loader, X } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';
  import { convertTo12HourFormat } from '$lib';
  import DayGridCalendar from '$lib/components/gen/DayGridCalendar.svelte';
  import DatePicker from '$lib/components/gen/DatePicker.svelte';

  interface Props {
    church: UserQType['churches'][number];
    reservationForm: SuperValidated<Infer<ReservationSchema>>;
  }

  const { ...restProps }: Props = $props();

  const user = fromUserState();

  const form = superForm(restProps.reservationForm, {
    validators: zodClient(reservationSchema),
    id: crypto.randomUUID(),
    onUpdate({ result }) {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success('', { description: data.msg });
          open = false;
          form.reset();
          goto('/my-reservations');
          break;
        case 401:
          toast.error('', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  let open = $state(false);
</script>

<Button
  onclick={() => {
    if (user.getUser()) {
      open = true;
      return;
    }
    goto('/authenticate?error=you-must-be-logged-in');
  }}
>
  Reserve Now @ ₱ {restProps.church.price.toLocaleString()}
</Button>
<AlertDialog.Root bind:open>
  <AlertDialog.Content class="flex max-h-screen max-w-[1200px] flex-col gap-[1rem] p-0">
    <button
      onclick={() => {
        open = false;
        form.reset();
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    >
      <X class="h-4 w-4" />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header class="px-6 pt-6">
      <AlertDialog.Title>Create Reservation</AlertDialog.Title>
      <AlertDialog.Description>
        You are creating reservation for <strong>Simbahang Banal</strong> from
        <strong>{convertTo12HourFormat(restProps.church.open_time)}</strong> to
        <strong>{convertTo12HourFormat(restProps.church.close_time)}</strong>
        Price varry on <strong> ₱ {restProps.church.price.toLocaleString()} </strong>
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form
      method="POST"
      action="?/reservationEvent"
      use:enhance
      class="flex flex-col gap-[1rem] overflow-auto p-[1rem] sm:px-[2rem] sm:pt-0"
    >
      <div class="grid gap-[1rem] md:grid-cols-[2fr_1fr]">
        <div class="py-2">
          <DayGridCalendar />
        </div>
        <div class="flex flex-col gap-[1rem]">
          <Form.Field {form} name="churchObj" class="hidden">
            <Form.Control>
              {#snippet children({ props })}
                <Input {...props} bind:value={restProps.church.id} />
              {/snippet}
            </Form.Control>
          </Form.Field>

          <Form.Field {form} name="eventName">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Event Name</Form.Label>
                <Input {...props} bind:value={$formData.eventName} placeholder="Enter event name" />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="guestCount">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Number Of Guest</Form.Label>
                <Input
                  type="number"
                  {...props}
                  bind:value={$formData.guestCount}
                  placeholder="Enter number of guest"
                />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="dateIn">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Enter Date In</Form.Label>
                <DatePicker bind:dateValueString={$formData.dateIn} />
                <input type="hidden" name={props.name} bind:value={$formData.dateIn} />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="initialTime">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Initial Time</Form.Label>
                <Input
                  {...props}
                  bind:value={$formData.initialTime}
                  placeholder="Enter initial time example 07:30 AM"
                />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="finalTime">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Final Time</Form.Label>
                <Input
                  {...props}
                  bind:value={$formData.finalTime}
                  placeholder="Enter final time example 11:30 AM"
                />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="clientNote">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Final Time</Form.Label>
                <Textarea
                  {...props}
                  bind:value={$formData.clientNote}
                  placeholder="Enter your note"
                />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
      </div>

      <div class="pointer-events-none sticky bottom-3 z-40 flex w-full justify-end">
        <Form.Button disabled={$submitting} class="pointer-events-auto relative">
          {#if $submitting}
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-sm bg-primary"
            >
              <Loader class="h-[15px] w-[15px] animate-spin" />
            </div>
          {/if}
          Submit Reservation
        </Form.Button>
      </div>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
