<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Logs } from 'lucide-svelte';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="flex items-center transition-all hover:scale-105 active:scale-95">
		<Logs />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Item>View</DropdownMenu.Item>
			<DropdownMenu.Item>Cancel</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
