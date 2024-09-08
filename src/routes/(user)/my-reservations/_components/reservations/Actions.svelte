<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Logs } from 'lucide-svelte';
	import ViewReservation from './_operations/ViewReservation.svelte';
	import type { UserQType } from '$lib/types';

	interface Props {
		reservation: UserQType['reservations'][number];
	}

	const { ...props }: Props = $props();

	let viewSignal = $state(false);

	const handleViewReservation = () => (viewSignal = true);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="flex items-center transition-all hover:scale-105 active:scale-95">
		<Logs />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Item onclick={handleViewReservation}>View</DropdownMenu.Item>
			<DropdownMenu.Item>Delete</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<ViewReservation bind:viewSignal reservation={props.reservation} />
