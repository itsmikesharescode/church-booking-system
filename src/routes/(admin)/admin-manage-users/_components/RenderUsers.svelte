<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import Actions from './_operations/Actions.svelte';
	import type { UpdateUserSchema } from './_operations/_operations/user-schema';

	interface Props {
		updateUserForm: SuperValidated<Infer<UpdateUserSchema>>;
	}

	const { updateUserForm }: Props = $props();
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[50px]"></Table.Head>
			<Table.Head class="truncate">EMAIL</Table.Head>
			<Table.Head class="truncate">CLIENT NAME</Table.Head>
			<Table.Head class="truncate">CREATED AT</Table.Head>
			<Table.Head class="truncate">MOBILE NUMBER</Table.Head>
			<Table.Head class="truncate">GENDER</Table.Head>
			<Table.Head class="truncate">BIRTH DATE</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each Array(10) as _, index}
			<Table.Row>
				<Table.Cell class="">
					<Actions {updateUserForm} />
				</Table.Cell>
				<Table.Cell>eviotamikemike@gmail.com</Table.Cell>
				<Table.Cell class="truncate">Eviota, Mike John Baguinaon</Table.Cell>
				<Table.Cell class="truncate">Aug 3, 2024 @ 10:20 AM</Table.Cell>
				<Table.Cell class="">09123456789</Table.Cell>
				<Table.Cell class="">Male</Table.Cell>
				<Table.Cell class="truncate">Nov 1, 1945</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
