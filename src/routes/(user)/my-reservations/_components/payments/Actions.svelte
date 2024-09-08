<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Logs } from 'lucide-svelte';
	import ViewPayment from './_operations/ViewPayment.svelte';
	import type { UserQType } from '$lib/types';

	interface Props {
		payment: UserQType['payments'][number];
	}

	const { ...props }: Props = $props();

	let viewSignal = $state(false);

	const handleViewPayment = () => (viewSignal = true);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="flex items-center transition-all hover:scale-105 active:scale-95">
		<Logs />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Item onclick={handleViewPayment}>View</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<ViewPayment bind:viewSignal payment={props.payment} />
