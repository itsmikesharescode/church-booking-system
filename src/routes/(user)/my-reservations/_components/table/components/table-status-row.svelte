<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import type { Row } from '@tanstack/table-core';
  import { type ReservationPageTable } from '../data/schemas';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import PaymentProcess from '../../reservations/_operations/PaymentProcess.svelte';

  let { row }: { row: Row<ReservationPageTable> } = $props();
</script>

<div class="flex items-center gap-2.5">
  {#if row.original.price}
    <PaymentProcess reservation={row.original} />
  {:else}
    <Badge variant="secondary">Pending</Badge>
  {/if}
</div>
