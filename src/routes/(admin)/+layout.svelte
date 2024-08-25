<script lang="ts">
	import { fromThemeState } from '../_states/fromThemeState.svelte';
	import { initManageUsersRoute } from './_states/fromManageUsers.svelte';

	const { children } = $props();

	const theme = fromThemeState();

	$effect(() => {
		const clientMode = localStorage.getItem('mode-watcher-mode');

		if (clientMode) {
			theme.set(clientMode === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)');
		}
		return;
	});

	initManageUsersRoute();
</script>

{@render children()}
