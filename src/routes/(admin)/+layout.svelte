<script lang="ts">
	import { fromThemeState } from '../_states/fromThemeState.svelte';
	import { fromManageUsersRoute, initManageUsersRoute } from './_states/fromManageUsers.svelte';

	const { data, children } = $props();

	const theme = fromThemeState();

	initManageUsersRoute();

	const manageUsersRoute = fromManageUsersRoute();

	$effect(() => {
		manageUsersRoute.setUsers(data.adminQ.data?.users ?? null);

		const clientMode = localStorage.getItem('mode-watcher-mode');

		if (clientMode) {
			theme.set(clientMode === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)');
		}
		return;
	});
</script>

{@render children()}
