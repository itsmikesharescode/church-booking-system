<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import type { Row } from '@tanstack/table-core';
  import { type DashboardPageTable } from '../data/schemas';
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  import { publicAPIs } from '$lib/index';

  let { row }: { row: Row<DashboardPageTable> } = $props();
</script>

<section class="flex items-center gap-2">
  <Avatar.Root>
    <Avatar.Image
      src={publicAPIs(row.original.photo_path, 'Church')}
      alt={`${row.original.name} photo`}
    />
    <Avatar.Fallback>{row.original.name.slice(0, 2)}</Avatar.Fallback>
  </Avatar.Root>
  <span class="line-clamp-1">{row.original.name}</span>
</section>
