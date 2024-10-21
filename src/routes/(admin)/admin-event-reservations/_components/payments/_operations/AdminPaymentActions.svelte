<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import type { AdminQType } from '$lib/types';
  import { Logs } from 'lucide-svelte';
  import AdminViewPayment from './_operations/AdminViewPayment.svelte';
  import AdminDeletePayment from './_operations/AdminDeletePayment.svelte';

  interface Props {
    payment: AdminQType['payments'][number];
  }

  const { ...props }: Props = $props();

  let viewSignal = $state(false);
  let deleteSignal = $state(false);

  const handleViewEvent = () => (viewSignal = true);
  const handleDeleteEvent = () => (deleteSignal = true);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button size="sm" variant="secondary"><Logs class="h-[15px] w-[15px]" /></Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Item onclick={handleViewEvent}>View</DropdownMenu.Item>
      <DropdownMenu.Item onclick={handleDeleteEvent}>Delete</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<AdminViewPayment bind:viewSignal payment={props.payment} />
<AdminDeletePayment bind:deleteSignal payment={props.payment} />
