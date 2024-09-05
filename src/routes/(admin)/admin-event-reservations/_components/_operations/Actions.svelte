<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Logs } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import ViewEvent from './_operations/ViewEvent.svelte';
	import DeleteEvent from './_operations/DeleteEvent.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { UpdateStatusEventSchema } from './_operations/event-schema';
	import UpdateStatus from './_operations/UpdateStatus.svelte';
	import type { BookJoinUser } from '$lib/types';

	interface Props {
		updateStatusEventForm: SuperValidated<Infer<UpdateStatusEventSchema>>;
		booking: BookJoinUser;
	}

	const { ...props }: Props = $props();

	let open = $state(false);
	let viewSignal = $state(false);
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
					viewSignal = true;
				}}
			>
				View Event
			</DropdownMenu.Item>
			<!-- <DropdownMenu.Item
				class="flex items-center justify-center"
				onclick={() => {
					updateSignal = true;
				}}
			>
				Update Status
			</DropdownMenu.Item> -->

			<DropdownMenu.Item
				class="flex items-center justify-center"
				onclick={() => {
					deleteSignal = true;
				}}
			>
				Delete Event
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<ViewEvent bind:viewSignal booking={props.booking} />
<!-- <UpdateStatus bind:updateSignal updateStatusEventForm={props.updateStatusEventForm} /> -->
<DeleteEvent bind:deleteSignal booking={props.booking} />
