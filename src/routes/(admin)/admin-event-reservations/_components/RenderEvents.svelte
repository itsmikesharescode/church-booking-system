<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import Actions from './_operations/Actions.svelte';
	import type { UpdateStatusEventSchema } from './_operations/_operations/event-schema';

	interface Props {
		updateStatusEventForm: SuperValidated<Infer<UpdateStatusEventSchema>>;
	}

	const { updateStatusEventForm }: Props = $props();
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[50px]"></Table.Head>
			<Table.Head class="w-[100px]">STATUS</Table.Head>
			<Table.Head class="truncate">REFERENCE NUMBER</Table.Head>
			<Table.Head class="w-[250px] truncate">CLIENT NAME</Table.Head>
			<Table.Head class="w-[250px] truncate">MOBILE NUMBER</Table.Head>
			<Table.Head class="w-[250px] truncate">EVENT NAME</Table.Head>
			<Table.Head class="w-[300px] truncate">DATE AND TIME</Table.Head>
			<Table.Head class="w-[100px] truncate">NO OF GUEST</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each Array(10) as _, index}
			<Table.Row>
				<Table.Cell class="">
					<Actions {updateStatusEventForm} />
				</Table.Cell>
				<Table.Cell class="font-medium"
					><span class="bg-yellow-900 p-[1px] px-[1rem] text-white">Pending</span></Table.Cell
				>
				<Table.Cell>WD-000002</Table.Cell>
				<Table.Cell>Eviota, Mike John Baguinaon</Table.Cell>
				<Table.Cell class="">09123456789</Table.Cell>
				<Table.Cell class="">Wedding</Table.Cell>
				<Table.Cell class="">Mar 18, 2024 10:00 AM - 12:00 PM</Table.Cell>
				<Table.Cell class="text-center">100</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
