<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
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
				<Table.Cell>WD-000002</Table.Cell>
				<Table.Cell class="truncate">Eviota, Mike John Baguinaon</Table.Cell>
				<Table.Cell class="">09123456789</Table.Cell>
				<Table.Cell class="">Wedding</Table.Cell>
				<Table.Cell class="truncate">Mar 18, 2024 10:00 AM - 12:00 PM</Table.Cell>
				<Table.Cell class="text-center">100</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
