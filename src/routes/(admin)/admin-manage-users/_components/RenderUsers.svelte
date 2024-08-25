<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import Actions from './_operations/Actions.svelte';
	import type { UpdateUserSchema } from '../manage-users-schema';
	import { fromManageUsersRoute } from '../../_states/fromManageUsers.svelte';

	interface Props {
		updateUserForm: SuperValidated<Infer<UpdateUserSchema>>;
	}

	const { updateUserForm }: Props = $props();

	const manageUsersRoute = fromManageUsersRoute();
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
		{#if !manageUsersRoute.getUsers()?.length}
			<div class="fixed left-0 right-0 mt-[10dvh]">
				<p class="text-center text-base font-semibold text-muted-foreground">No users</p>
			</div>
		{/if}
		{#each manageUsersRoute.getUsers() ?? [] as user}
			<Table.Row>
				<Table.Cell class="">
					<Actions {updateUserForm} userProp={user} />
				</Table.Cell>
				<Table.Cell>{user.user_meta_data.email}</Table.Cell>
				<Table.Cell class="truncate">
					{user.user_meta_data.lastName},
					{user.user_meta_data.firstName}
					{user.user_meta_data.middleName}
				</Table.Cell>
				<Table.Cell class="truncate">
					{new Date(user.created_at).toLocaleDateString()} @
					{new Date(user.created_at).toLocaleTimeString()}
				</Table.Cell>
				<Table.Cell class="">{user.user_meta_data.mobileNum}</Table.Cell>
				<Table.Cell class="">{user.user_meta_data.gender}</Table.Cell>
				<Table.Cell class="truncate">{user.user_meta_data.birthDate}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
