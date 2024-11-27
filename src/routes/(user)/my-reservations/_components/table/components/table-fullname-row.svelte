<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  import type { Row } from '@tanstack/table-core';
  import { type AccountPageTable } from '../data/schemas';
  import { PUBLIC_SUPABASE_STORAGE_URL } from '$env/static/public';

  let { row }: { row: Row<AccountPageTable> } = $props();
</script>

<div class="flex items-center gap-2.5">
  <Avatar.Root>
    <Avatar.Image src={`${PUBLIC_SUPABASE_STORAGE_URL}${row.original.avatar}`} alt="profile" />
    <Avatar.Fallback>{row.original.fullName[0].toUpperCase()}</Avatar.Fallback>
  </Avatar.Root>
  <div class="">
    {row.original.fullName}
  </div>
</div>
