<script lang="ts">
  import { getBookingStatus } from '$lib';
  import type { Book2User, UserQType } from '$lib/types';
  import * as Table from '$lib/components/ui/table';
  import { Logs } from 'lucide-svelte';
  import Actions from './Actions.svelte';
  import { fromReservationRoute } from '../../../../_states/fromReservationState.svelte';

  interface Props {
    payments: UserQType['payments'] | null;
  }

  const { ...props }: Props = $props();

  const reservationRoute = fromReservationRoute();
</script>

<Table.Root>
  {#if !reservationRoute.getPayments()?.length}
    <Table.Caption>No payments record.</Table.Caption>
  {/if}
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[60px]"></Table.Head>
      <Table.Head class="truncate">REF #</Table.Head>
      <Table.Head class="truncate">CHANNEL</Table.Head>
      <Table.Head class="truncate">METHOD</Table.Head>
      <Table.Head class="truncate">DATE</Table.Head>
      <Table.Head class="truncate">AMOUNT</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each reservationRoute.getPayments() ?? [] as payment}
      <Table.Row>
        <Table.Cell class="">
          <Actions {payment} />
        </Table.Cell>
        <Table.Cell class="truncate font-medium">
          {payment.xendit_callback.payment_method_id}
        </Table.Cell>
        <Table.Cell class="truncate">{payment.xendit_callback.payment_channel}</Table.Cell>
        <Table.Cell class="truncate">{payment.xendit_callback.payment_method}</Table.Cell>
        <Table.Cell class="truncate">
          {new Date(payment.xendit_callback.created).toLocaleDateString()}</Table.Cell
        >
        <Table.Cell class="truncate">
          ₱ {payment.xendit_callback.paid_amount.toLocaleString()}
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
