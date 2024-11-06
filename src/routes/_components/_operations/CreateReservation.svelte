<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { reservationSchema, type ReservationSchema } from './schema';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { ChurchType, Result, UserQType } from '$lib/types';
  import CustomDate from '$lib/components/gen/CustomDate.svelte';
  import Textarea from '$lib/components/ui/textarea/textarea.svelte';
  import { fromUserState } from '../../_states/fromUserState.svelte';
  import { goto } from '$app/navigation';
  import { Loader, X } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';
  import { convertTo12HourFormat } from '$lib';
  import * as Popover from '$lib/components/ui/popover';
  import DayGridCalendar from '$lib/components/gen/DayGridCalendar.svelte';

  interface Props {
    church: UserQType['churches'][number];
    reservationForm: SuperValidated<Infer<ReservationSchema>>;
  }

  const { ...props }: Props = $props();

  const user = fromUserState();

  const form = superForm(props.reservationForm, {
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
  Reserve Now @ ₱ {props.church.price.toLocaleString()}
</Button>
<AlertDialog.Root bind:open>
  <AlertDialog.Content class="flex max-h-screen max-w-[800px] flex-col gap-[1rem] p-0">
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
    <AlertDialog.Header class="p-[1rem] sm:px-[2rem] sm:pt-[2rem]">
      <AlertDialog.Title>Create Reservation</AlertDialog.Title>
      <AlertDialog.Description>
        You are creating reservation for <strong>Simbahang Banal</strong> from
        <strong>{convertTo12HourFormat(props.church.open_time)}</strong> to
        <strong>{convertTo12HourFormat(props.church.close_time)}</strong>
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form
      method="POST"
      action="?/reservationEvent"
      use:enhance
      class="flex flex-col gap-[1rem] overflow-auto p-[1rem] sm:px-[2rem] sm:pt-0"
    >
      <Form.Field {form} name="churchObj" class="hidden">
        <Form.Control let:attrs>
          <Input {...attrs} value={JSON.stringify(props.church)} />
        </Form.Control>
      </Form.Field>

      <Form.Field {form} name="eventName">
        <Form.Control let:attrs>
          <Form.Label>Event Name</Form.Label>
          <Input {...attrs} bind:value={$formData.eventName} placeholder="Enter event name" />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <div class="grid gap-[1rem] md:grid-cols-2">
        <Form.Field {form} name="guestCount">
          <Form.Control let:attrs>
            <Form.Label>Number Of Guest</Form.Label>
            <Input
              type="number"
              {...attrs}
              bind:value={$formData.guestCount}
              placeholder="Enter number of guest"
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="dateIn">
          <Form.Control let:attrs>
            <Form.Label>Enter Date In</Form.Label>
            <CustomDate {attrs} bind:dateValue={$formData.dateIn} />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>

      <div class="">
        <div class="grid gap-[1rem] md:grid-cols-2">
          <Form.Field {form} name="initialTime">
            <Form.Control let:attrs>
              <Form.Label>Initial Time</Form.Label>
              <Input
                {...attrs}
                bind:value={$formData.initialTime}
                placeholder="Enter initial time example 07:30 AM"
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="finalTime">
            <Form.Control let:attrs>
              <Form.Label>Final Time</Form.Label>
              <Input
                {...attrs}
                bind:value={$formData.finalTime}
                placeholder="Enter final time example 11:30 AM"
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
        <DayGridCalendar />
      </div>

      <Form.Field {form} name="clientNote">
        <Form.Control let:attrs>
          <Form.Label>Note</Form.Label>
          <Textarea {...attrs} bind:value={$formData.clientNote} placeholder="Enter your note" />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <AlertDialog.Footer class="flex flex-col gap-[1rem] sm:gap-0">
        <Form.Button disabled={$submitting} class="relative">
          {#if $submitting}
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-sm bg-primary"
            >
              <Loader class="h-[15px] w-[15px] animate-spin" />
            </div>
          {/if}
          Submit Reservation
        </Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
