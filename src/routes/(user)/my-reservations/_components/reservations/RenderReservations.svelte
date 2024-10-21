<script lang="ts">
  import { convertTo12HourFormat, getBookingStatus } from '$lib';
  import type { Book2User, UserQType } from '$lib/types';
  import * as Table from '$lib/components/ui/table';
  import { Logs } from 'lucide-svelte';
  import Actions from './Actions.svelte';
  import PaymentProcess from './_operations/PaymentProcess.svelte';

  interface Props {
    bookings: UserQType['reservations'] | null;
  }

  const { ...props }: Props = $props();
</script>

<Table.Root>
  {#if !props.bookings?.length}
    <Table.Caption>No booking record.</Table.Caption>
  {/if}
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[60px]"></Table.Head>
      <Table.Head class="truncate">EVENT NAME</Table.Head>
      <Table.Head class="truncate">STATUS</Table.Head>
      <Table.Head class="truncate">PREVIEW</Table.Head>
      <Table.Head class="truncate">EVENT DATE</Table.Head>
      <Table.Head class="truncate">GUEST #</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each props.bookings ?? [] as booking}
      <Table.Row>
        <Table.Cell class="">
          <Actions reservation={booking} />
        </Table.Cell>
        <Table.Cell class="truncate font-medium">{booking.event_name}</Table.Cell>
        <Table.Cell class="truncate">
          {#if booking.price}
            <PaymentProcess reservation={booking} />
          {:else}
            <span class=" bg-red-600 px-[0.5rem] font-semibold text-white">Pending</span>
          {/if}
        </Table.Cell>
        <Table.Cell class="truncate">
          {getBookingStatus(`${booking.date}/${booking.initial_time}/${booking.final_time}`)}
        </Table.Cell>
        <Table.Cell class="truncate">
          {booking.date}
          {convertTo12HourFormat(booking.initial_time)} - {convertTo12HourFormat(
            booking.final_time
          )}
        </Table.Cell>

        <Table.Cell class="truncate">
          {booking.number_guest}
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
