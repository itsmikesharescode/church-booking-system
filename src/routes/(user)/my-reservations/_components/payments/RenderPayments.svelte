<script lang="ts">
	import { getBookingStatus } from '$lib';
	import type { Book2User, UserQType } from '$lib/types';
	import * as Table from '$lib/components/ui/table';
	import { Logs } from 'lucide-svelte';
	import Actions from './Actions.svelte';

	interface Props {
		bookings: UserQType['reservations'] | null;
	}

	const { ...props }: Props = $props();
</script>

<Table.Root>
	<!-- <Table.Caption>A list of your recent invoices.</Table.Caption> -->
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[60px]"></Table.Head>
			<Table.Head class="truncate">Event Name</Table.Head>
			<Table.Head class="truncate">Status</Table.Head>
			<Table.Head class="truncate">Method</Table.Head>
			<Table.Head class="truncate">Amount</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		<Table.Row>
			<Table.Cell class="">
				<Actions />
			</Table.Cell>
			<Table.Cell class="truncate font-medium">INV001</Table.Cell>
			<Table.Cell class="truncate">Paid</Table.Cell>
			<Table.Cell class="truncate">Credit Card</Table.Cell>
			<Table.Cell class="truncate">$250.00</Table.Cell>
		</Table.Row>
	</Table.Body>
</Table.Root>
