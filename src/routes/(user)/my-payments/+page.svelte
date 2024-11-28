<script lang="ts">
  import { fromReservationRoute } from '../../_states/fromReservationState.svelte';
  import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';
  import Table from './components/table/components/table.svelte';
  import { columns } from './components/table/components/columns';

  const staticRoute = fromStaticRouteState();
  const reservationRoute = fromReservationRoute();

  staticRoute.setRoute('/my-payments');
</script>

<div class="flex flex-col gap-[3rem] p-[1rem] sm:p-[2rem]">
  <div class="flex flex-col gap-2">
    <div class="flex justify-end">
      <div class="max-w-fit">
        <!-- <ReservationPagination /> -->
      </div>
    </div>
    <Table
      data={reservationRoute.getPayments()?.map((item) => ({
        id: item.id,
        created_at: item.created_at,
        user_id: item.user_id,
        ref_id: item.xendit_callback.id,
        method: item.xendit_callback.payment_channel,
        date: item.xendit_callback.created,
        amount: item.xendit_callback.amount,
        xendit_callback: item.xendit_callback,
        booking_obj: item.booking_obj
      })) ?? []}
      {columns}
    />
  </div>
</div>
