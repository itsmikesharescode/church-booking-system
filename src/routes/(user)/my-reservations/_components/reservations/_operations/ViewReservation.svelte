<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import { X } from 'lucide-svelte';
  import type { UserQType } from '$lib/types';
  import { convertTo12HourFormat } from '$lib';
  import PaymentProcess from './PaymentProcess.svelte';

  interface Props {
    viewSignal: boolean;
    reservation: UserQType['reservations'][number];
  }

  let { viewSignal = $bindable(), ...props }: Props = $props();
</script>

<AlertDialog.Root bind:open={viewSignal}>
  <AlertDialog.Content class="flex max-h-screen max-w-[800px] flex-col gap-[1rem]">
    <button
      onclick={() => {
        viewSignal = false;
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    >
      <X class="h-4 w-4" />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header>
      <AlertDialog.Title>Reservation Details</AlertDialog.Title>
    </AlertDialog.Header>

    <div class="flex flex-col gap-[0.625rem] overflow-auto">
      <div class="flex flex-wrap gap-[0.5rem]">
        <p class="text-sm leading-7 md:text-base">
          <strong>Price:</strong>
          {props.reservation.price ?? 'Not available'}
        </p>
      </div>

      <div class="flex flex-wrap gap-[0.5rem]">
        <p class="text-sm leading-7 md:text-base">
          <strong>Status:</strong>
        </p>

        {#if props.reservation.price}
          <PaymentProcess reservation={props.reservation} />
        {:else}
          <span class=" bg-red-600 px-[0.5rem] font-semibold text-white">Pending</span>
        {/if}
      </div>
      <!-- <p class="text-sm leading-7 md:text-base">
				<strong>Reference Number:</strong> WD-000002
			</p> -->
      <p class="text-sm leading-7 md:text-base">
        <strong>Event Name:</strong>
        {props.reservation.event_name}
      </p>

      <p class="text-sm leading-7 md:text-base">
        <strong>Date and Time:</strong>
        {props.reservation.date}
        {convertTo12HourFormat(props.reservation.initial_time)} - {convertTo12HourFormat(
          props.reservation.final_time
        )}
      </p>

      <p class="text-sm leading-7 md:text-base">
        <strong>Number of Guests:</strong>
        {props.reservation.number_guest}
      </p>

      <div class="">
        <p class="text-sm font-semibold leading-7 md:text-base">Notes:</p>

        <pre class="text-wrap font-sans text-sm leading-7 md:text-base">{props.reservation
            .event_note}</pre>
      </div>
    </div>
  </AlertDialog.Content>
</AlertDialog.Root>
