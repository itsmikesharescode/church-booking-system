<script lang="ts">
  import { fromReservationRoute } from '../../_states/fromReservationState.svelte';
  import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';
  import RenderPayments from './_components/payments/RenderPayments.svelte';
  import Table from './_components/table/components/table.svelte';
  import { columns } from './_components/table/components/columns';

  const staticRoute = fromStaticRouteState();
  const reservationRoute = fromReservationRoute();

  staticRoute.setRoute('/my-reservations');
</script>

<div class="f flex flex-col gap-[3rem] p-[1rem] sm:p-[2rem]">
  <div class="">
    <p class="text-3xl font-semibold">Reservations</p>
    <div class="flex justify-end">
      <div class="max-w-fit">
        <!-- <ReservationPagination /> -->
      </div>
    </div>
    <Table
      data={reservationRoute.getReservations()?.map((item) => ({
        user_id: item.user_id,
        id: item.id,
        created_at: item.created_at,
        church_id: item.church_id,
        event_name: item.event_name,
        number_guest: item.number_guest,
        date: item.date,
        initial_time: item.initial_time,
        final_time: item.final_time,
        event_note: item.event_note,
        price: item.price
      })) ?? []}
      {columns}
    />
  </div>

  <div class="">
    <p class="text-3xl font-semibold">Payments</p>
    <div class="flex justify-end">
      <div class="max-w-fit">
        <!-- <PaymentPagination /> -->
      </div>
    </div>
    <RenderPayments payments={reservationRoute.getPayments()} />
  </div>
</div>
