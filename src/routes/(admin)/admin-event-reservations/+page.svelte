<script lang="ts">
  import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';
  import { fromReservationRouteState } from '../_states/fromReservations.svelte';
  import AdminRenderEvents from './_components/bookings/AdminRenderEvents.svelte';
  import AdminRenderPayment from './_components/payments/AdminRenderPayments.svelte';

  const { data } = $props();

  const staticRoute = fromStaticRouteState();

  staticRoute.setRoute('/admin-event-reservations');
  const reservationRoute = fromReservationRouteState();
</script>

<div class="flex flex-col gap-[2rem] p-[1rem] sm:p-[3rem]">
  <section class="flex flex-col gap-[0.625rem]">
    <p class="text-3xl font-semibold">Requests</p>
    <div class="flex justify-end">
      <div class="max-w-fit">
        <!-- <Pagination /> -->
      </div>
    </div>
    <AdminRenderEvents bookings={reservationRoute.getBookings()} approveForm={data.approveForm} />
  </section>

  <section class="flex flex-col gap-[0.625rem]">
    <p class="text-3xl font-semibold">Payments</p>
    <div class="flex justify-end">
      <div class="max-w-fit">
        <!-- <PaymentPagination /> -->
      </div>
    </div>
    <AdminRenderPayment />
  </section>
</div>
