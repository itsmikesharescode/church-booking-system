<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import type { Row } from '@tanstack/table-core';
  import { type PaymentsPageTable } from '../data/schemas';
  import { convertTo12HourFormat } from '$lib';

  let { row }: { row: Row<PaymentsPageTable> } = $props();
</script>

<div class="flex items-center gap-2.5">
  <span>asdasd </span>
</div>
