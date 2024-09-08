<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import Actions from './_operations/Actions.svelte';
	import { convertTo12HourFormat, getBookingStatus } from '$lib';
	import type { AdminQType } from '$lib/types';
	import type { ApproveSchema } from './_operations/_operations/event-schema';

	interface Props {
		approveForm: SuperValidated<Infer<ApproveSchema>>;
		bookings: AdminQType['bookings'] | null;
	}

	const { ...props }: Props = $props();
</script>

<Table.Root>
	{#if !props.bookings?.length}
		<Table.Caption>No bookings record.</Table.Caption>
	{/if}
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[50px]"></Table.Head>
			<Table.Head class="w-[100px]">STATUS</Table.Head>
			<Table.Head class="w-[150px] truncate">PRICE</Table.Head>
			<Table.Head class="w-[100px]">PREVIEW</Table.Head>
			<Table.Head class="w-[250px] truncate">CLIENT NAME</Table.Head>
			<Table.Head class="w-[250px] truncate">EVENT NAME</Table.Head>
			<Table.Head class="w-[300px] truncate">DATE AND TIME</Table.Head>
			<Table.Head class="w-[100px] truncate">NO OF GUEST</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each props.bookings ?? [] as booking, index}
			<Table.Row>
				<Table.Cell class="">
					<Actions approveForm={props.approveForm} {booking} />
				</Table.Cell>
				<Table.Cell class="">
					<span
						class="{booking.price ? 'bg-green-700' : 'bg-red-500'}  p-[1px] px-[1rem] text-white"
					>
						{booking.price ? 'Approved' : 'Pending'}
					</span>
				</Table.Cell>
				<Table.Cell class="truncate">
					{booking.price ?? 'Not available'}
				</Table.Cell>
				<Table.Cell>
					{getBookingStatus(`${booking.date}/${booking.initial_time}/${booking.final_time}`)}
				</Table.Cell>
				<Table.Cell class="truncate">
					{booking.user_data.user_meta_data.lastName},
					{booking.user_data.user_meta_data.firstName}
					{booking.user_data.user_meta_data.middleName},
				</Table.Cell>
				<Table.Cell class="">{booking.event_name}</Table.Cell>
				<Table.Cell class="truncate">
					{booking.date}
					{convertTo12HourFormat(booking.initial_time)} - {convertTo12HourFormat(
						booking.final_time
					)}
				</Table.Cell>
				<Table.Cell class="text-center">{booking.number_guest}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
