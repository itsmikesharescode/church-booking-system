<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import FileCheck from 'lucide-svelte/icons/file-check';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import type { Row } from '@tanstack/table-core';
  import { type PaymentsPageTable } from '../data/schemas';
  import X from 'lucide-svelte/icons/x';
  import { convertTo12HourFormat, getBookingStatus } from '$lib';

  let { row }: { row: Row<PaymentsPageTable> } = $props();

  let open = $state(false);
</script>

<AlertDialog.Root bind:open>
  <AlertDialog.Trigger class=" group h-full rounded-full p-2 transition-all hover:bg-primary">
    <FileCheck class="h-4 w-4 group-hover:text-secondary" />
  </AlertDialog.Trigger>
  <AlertDialog.Content class="flex max-h-screen max-w-[800px] flex-col gap-[1rem]">
    <button
      onclick={() => {
        open = false;
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    >
      <X class="h-4 w-4" />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header>
      <AlertDialog.Title>Payment Details</AlertDialog.Title>
    </AlertDialog.Header>

    <div class="flex flex-col gap-[0.625rem] overflow-auto">
      <div class="flex flex-wrap gap-[0.5rem]">
        <p class="text-sm leading-7 md:text-base">
          <strong>Price:</strong>
          ₱ {row.original.booking_obj.price.toLocaleString() ?? 'Not available'}
        </p>
      </div>

      <div class="flex flex-wrap gap-[0.5rem]">
        <p class="text-sm leading-7 md:text-base">
          <strong>Status:</strong>
        </p>

        <span class=" bg-green-600 px-[0.5rem] font-semibold text-white">Approved</span>
      </div>

      <div class="flex flex-wrap gap-[0.5rem]">
        <p class="text-sm leading-7 md:text-base">
          <strong>Preview:</strong>
        </p>

        {getBookingStatus(
          `${row.original.booking_obj.date}/${row.original.booking_obj.initial_time}/${row.original.booking_obj.final_time}`
        )}
      </div>

      <!-- <p class="text-sm leading-7 md:text-base">
				<strong>Reference Number:</strong> WD-000002
			</p> -->
      <p class="text-sm leading-7 md:text-base">
        <strong>Event Name:</strong>
        {row.original.booking_obj.event_name}
      </p>

      <p class="text-sm leading-7 md:text-base">
        <strong>Date and Time:</strong>
        {row.original.booking_obj.date} /
        {convertTo12HourFormat(row.original.booking_obj.initial_time)} - {convertTo12HourFormat(
          row.original.booking_obj.final_time
        )}
      </p>

      <p class="text-sm leading-7 md:text-base">
        <strong>Number of Guests:</strong>
        {row.original.booking_obj.number_guest}
      </p>

      <div class="">
        <p class="text-sm font-semibold leading-7 md:text-base">Notes:</p>

        <pre class="text-wrap font-sans text-sm leading-7 md:text-base">{row.original.booking_obj
            .event_note}</pre>
      </div>
    </div>
  </AlertDialog.Content>
</AlertDialog.Root>
