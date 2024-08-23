<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Logs } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';

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
