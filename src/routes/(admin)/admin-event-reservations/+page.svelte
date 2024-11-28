<script lang="ts">
  import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';
  import { fromReservationRouteState } from '../_states/fromReservations.svelte';
  import Table from './components/table/components/table.svelte';
  import { columns } from './components/table/components/columns';
  import { convertTo12HourFormat, getBookingStatus } from '$lib';
  import ViewReservation from './components/view-reservation/view-reservation.svelte';
  import DeleteReservation from './components/delete-reservation/delete-reservation.svelte';
  import ApproveReservation from './components/approve-reservation/approve-reservation.svelte';
  import { initTableState } from './components/table/tableState.svelte';
  const { data } = $props();

  const staticRoute = fromStaticRouteState();

  staticRoute.setRoute('/admin-event-reservations');
  const reservationRoute = fromReservationRouteState();

  initTableState();
</script>

<div class="flex flex-col gap-[2rem] p-[1rem] sm:p-[3rem]">
  <section class="flex flex-col gap-[0.625rem]">
    <p class="text-3xl font-semibold">Requests</p>

    <Table
      {columns}
      data={(reservationRoute.getBookings() ?? []).map((item) => ({
        id: item.id,
        created_at: item.created_at,
        status: item.price ? 'Approved' : 'Pending',
        price: item.price ?? 0,
        preview: getBookingStatus(`${item.date}/${item.initial_time}/${item.final_time}`),
        client_name: `${item.user_data.user_meta_data.lastName}, ${item.user_data.user_meta_data.firstName} ${item.user_data.user_meta_data.middleName}`,
        event_name: item.event_name,
        date: `${item.date}/${convertTo12HourFormat(item.initial_time)} - ${convertTo12HourFormat(item.final_time)}`,
        number_of_guests: item.number_guest,
        user_meta_data: item.user_data.user_meta_data,
        church_data: item.church_data,
        event_note: item.event_note
      })) ?? []}
    />
  </section>
</div>

<ApproveReservation approveForm={data.approveForm} />
<ViewReservation />
<DeleteReservation />
