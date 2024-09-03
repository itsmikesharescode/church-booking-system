<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import Actions from './_operations/Actions.svelte';
	import { fromDashBRouteState } from '../../_states/fromDashboard.svelte';
	import { convertTo12HourFormat, publicAPIs } from '$lib';
	import * as Avatar from '$lib/components/ui/avatar';

	const dashboardRoute = fromDashBRouteState();
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[50px]"></Table.Head>
			<Table.Head class="truncate">CHURCH NAME</Table.Head>
			<Table.Head class="truncate">OPENING HOURS</Table.Head>
			<Table.Head class="truncate">Description</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each dashboardRoute.getChurches() ?? [] as church (church)}
			<Table.Row>
				<Table.Cell class="">
					<Actions />
				</Table.Cell>
				<Table.Cell class="flex items-center  gap-[0.625rem] truncate font-medium">
					<Avatar.Root>
						<Avatar.Image src={publicAPIs(church.photo_path, 'Church')} alt="churchPhoto" />
						<Avatar.Fallback>{church.name[0].toLocaleUpperCase()}</Avatar.Fallback>
					</Avatar.Root>
					{church.name}
				</Table.Cell>
				<Table.Cell
					>{convertTo12HourFormat(church.open_time)} -
					{convertTo12HourFormat(church.close_time)}
				</Table.Cell>
				<Table.Cell class="truncate">{church.description}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
