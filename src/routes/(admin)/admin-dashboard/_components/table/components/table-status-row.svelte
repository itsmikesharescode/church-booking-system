<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import type { Row } from '@tanstack/table-core';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import type { DashboardPageTable } from '../data/schemas';

  let { row }: { row: Row<DashboardPageTable> } = $props();
</script>

<div class="flex items-center gap-2.5">
  <Badge variant="secondary">Pending</Badge>
</div>
