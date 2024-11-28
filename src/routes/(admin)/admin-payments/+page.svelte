<script lang="ts">
  import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';
  import { fromReservationRouteState } from '../_states/fromReservations.svelte';
  import Table from './components/table/components/table.svelte';
  import { columns } from './components/table/components/columns';
  import DeletePayment from './components/delete-payment/delete-payment.svelte';
  import ViewPayment from './components/view-payment/view-payment.svelte';
  import { initTableState } from './components/table/tableState.svelte';

  const staticRoute = fromStaticRouteState();

  staticRoute.setRoute('/admin-payments');
  const reservationRoute = fromReservationRouteState();

  initTableState();
</script>

<div class="flex flex-col gap-[2rem] p-[1rem] sm:p-[3rem]">
  <section class="flex flex-col gap-[0.625rem]">
    <p class="text-3xl font-semibold">Payments</p>

    <Table
      {columns}
      data={reservationRoute.getPayments()?.map((item) => ({
        id: item.id,
        created_at: item.created_at,
        user_id: item.user_id,
        ref_id: item.xendit_callback.id,
        method: item.xendit_callback.payment_channel,
        amount: item.xendit_callback.amount,
        xendit_callback: item.xendit_callback,
        booking_obj: item.booking_obj
      })) ?? []}
    />
  </section>
</div>

<DeletePayment />
<ViewPayment />
