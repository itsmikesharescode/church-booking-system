<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import Actions from './_operations/Actions.svelte';
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[50px]"></Table.Head>
			<Table.Head class="truncate">CHURCH NAME</Table.Head>
			<Table.Head class="truncate">CREATED AT</Table.Head>
			<Table.Head class="truncate">ADDRESS</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each Array(10) as _, index}
			<Table.Row>
				<Table.Cell class="">
					<Actions />
				</Table.Cell>
				<Table.Cell class="truncate font-medium">Holy Saint Banal Church</Table.Cell>
				<Table.Cell>Nov 6 1744</Table.Cell>
				<Table.Cell class="truncate"
					>St.thomas phase 3, Bikol Albay Pasig City Rizal Cainta Nation</Table.Cell
				>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
