<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Logs } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import ViewChurch from './_operations/ViewChurch.svelte';
	import type { ChurchType } from '$lib/types';
	import type { UpdateChInfoSchema, UpdateChPhotoSchema } from '../admin-dashboard-schema';
	import DeleteChurch from './_operations/DeleteChurch.svelte';

	interface Props {
		church: ChurchType;
		updateChInfoForm: SuperValidated<Infer<UpdateChInfoSchema>>;
		updateChPhotoForm: SuperValidated<Infer<UpdateChPhotoSchema>>;
	}

	const { ...props }: Props = $props();

	let viewSignal = $state(false);
	let deleteSignal = $state(false);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button size="sm" variant="secondary"><Logs class="h-[15px] w-[15px]" /></Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Item
				class="flex items-center justify-center"
				onclick={() => {
					viewSignal = true;
				}}
			>
				View Church
			</DropdownMenu.Item>

			<DropdownMenu.Item
				class="flex items-center justify-center"
				onclick={() => {
					deleteSignal = true;
				}}
			>
				Delete Church
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<ViewChurch
	bind:viewSignal
	church={props.church}
	updateChInfoForm={props.updateChInfoForm}
	updateChPhotoForm={props.updateChPhotoForm}
/>

<DeleteChurch church={props.church} bind:deleteSignal />
