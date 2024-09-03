<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import type { Result, UserType } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { fromManageUsersRoute } from '../../../../_states/fromManageUsers.svelte';
	import { toast } from 'svelte-sonner';
	import Button from '$lib/components/ui/button/button.svelte';
	import { enhance } from '$app/forms';
	import { Loader } from 'lucide-svelte';

	interface Props {
		deleteSignal: boolean;
		userProp: UserType;
	}

	let { deleteSignal = $bindable(), userProp }: Props = $props();

	const manageUsersRoute = fromManageUsersRoute();

	let deleteLoader = $state(false);
	const deleteUserEvent: SubmitFunction = () => {
		deleteLoader = true;
		return async ({ result }) => {
			const { status, data } = result as Result<{ msg: string; data: UserType[] }>;

			switch (status) {
				case 200:
					toast.success('', { description: data.msg });
					manageUsersRoute.setUsers(data.data);
					deleteSignal = false;
					break;

				case 401:
					toast.error('', { description: data.msg });
					break;
			}

			deleteLoader = false;
		};
	};
</script>

<AlertDialog.Root bind:open={deleteSignal}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete {userProp.user_meta_data
					.lastName} details in our database.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer class="gap-[0.625rem] sm:gap-0">
			<Button disabled={deleteLoader} variant="secondary" onclick={() => (deleteSignal = false)}>
				Cancel
			</Button>
			<form method="post" action="?/deleteUserEvent" use:enhance={deleteUserEvent}>
				<input name="userId" type="hidden" value={userProp.user_id} />
				<Button disabled={deleteLoader} type="submit" class="relative w-full">
					{#if deleteLoader}
						<div
							class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-sm bg-primary"
						>
							<Loader class="h-[15px] w-[15px] animate-spin" />
						</div>
					{/if}

					Proceed
				</Button>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
