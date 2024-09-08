<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Logs } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import ViewEvent from './_operations/ViewEvent.svelte';
	import DeleteEvent from './_operations/DeleteEvent.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { UpdateStatusEventSchema } from './_operations/event-schema';
	import ApproveEvent from './_operations/ApproveEvent.svelte';
	import type { AdminQType } from '$lib/types';

	interface Props {
		updateStatusEventForm: SuperValidated<Infer<UpdateStatusEventSchema>>;
		booking: AdminQType['bookings'][number];
	}

	const { ...props }: Props = $props();

	let open = $state(false);
	let viewSignal = $state(false);
	let updateSignal = $state(false);
	let deleteSignal = $state(false);
	let approveSignal = $state(false);
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
					approveSignal = true;
				}}
			>
				Approve
			</DropdownMenu.Item>
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

<ApproveEvent bind:approveSignal booking={props.booking} />
<ViewEvent bind:viewSignal booking={props.booking} />
<DeleteEvent bind:deleteSignal booking={props.booking} />
