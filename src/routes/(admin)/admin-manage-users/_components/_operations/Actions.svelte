<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Logs } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import DeleteUser from './_operations/DeleteUser.svelte';
	import UpdateUser from './_operations/UpdateUser.svelte';
	import type { UpdateUserSchema } from './_operations/user-schema';

	interface Props {
		updateUserForm: SuperValidated<Infer<UpdateUserSchema>>;
	}

	const { updateUserForm }: Props = $props();

	let open = $state(false);
	let updateSignal = $state(false);
	let deleteSignal = $state(false);
</script>

<DropdownMenu.Root bind:open>
	<DropdownMenu.Trigger>
		<Button size="sm" variant="secondary"><Logs class="h-[15px] w-[15px]" /></Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Item
				class="flex items-center justify-center"
				onclick={() => {
					updateSignal = true;
				}}
			>
				Update
			</DropdownMenu.Item>

			<DropdownMenu.Item
				class="flex items-center justify-center"
				onclick={() => {
					deleteSignal = true;
				}}
			>
				Delete
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<DeleteUser bind:deleteSignal />
<UpdateUser bind:updateSignal {updateUserForm} />
