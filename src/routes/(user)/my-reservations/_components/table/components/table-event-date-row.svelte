<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import type { Row } from '@tanstack/table-core';
  import { type ReservationPageTable } from '../data/schemas';
  import { convertTo12HourFormat } from '$lib';

  let { row }: { row: Row<ReservationPageTable> } = $props();
</script>

<div class="flex items-center gap-2.5">
  <span>
    {row.original.date} /
    {convertTo12HourFormat(row.original.initial_time)} -
    {convertTo12HourFormat(row.original.final_time)}
  </span>
</div>
