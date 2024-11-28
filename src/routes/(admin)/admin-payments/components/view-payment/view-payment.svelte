<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import { X } from 'lucide-svelte';
  import { convertTo12HourFormat, getBookingStatus } from '$lib';
  import { useTableState } from '../table/tableState.svelte';

  const tableState = useTableState();
</script>

<AlertDialog.Root open={tableState.getShowView()}>
  <AlertDialog.Content class="flex max-h-screen max-w-[800px] flex-col gap-[1rem]">
    <button
      type="button"
      onclick={() => {
        tableState.setActiveRow(null);
        tableState.setShowView(false);
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
          {tableState.getActiveRow()?.booking_obj.price ?? 'Not available'}
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

        {#if tableState.getShowView()}
          {getBookingStatus(
            `${tableState.getActiveRow()?.booking_obj.date}/${tableState.getActiveRow()?.booking_obj.initial_time}/${tableState.getActiveRow()?.booking_obj.final_time}`
          )}
        {/if}
      </div>

      <p class="text-sm leading-7 md:text-base">
        <strong>Event Name:</strong>
        {tableState.getActiveRow()?.booking_obj.event_name}
      </p>

      <p class="text-sm leading-7 md:text-base">
        <strong>Date and Time:</strong>
        {tableState.getActiveRow()?.booking_obj.date}
        {convertTo12HourFormat(tableState.getActiveRow()?.booking_obj.initial_time ?? '')} - {convertTo12HourFormat(
          tableState.getActiveRow()?.booking_obj.final_time ?? ''
        )}
      </p>

      <p class="text-sm leading-7 md:text-base">
        <strong>Number of Guests:</strong>
        {tableState.getActiveRow()?.booking_obj.number_guest}
      </p>

      <div class="">
        <p class="text-sm font-semibold leading-7 md:text-base">Notes:</p>

        <pre class="text-wrap font-sans text-sm leading-7 md:text-base">{tableState.getActiveRow()
            ?.booking_obj.event_note}</pre>
      </div>
    </div>
  </AlertDialog.Content>
</AlertDialog.Root>
