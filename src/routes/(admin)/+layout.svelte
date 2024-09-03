<script lang="ts">
	import { fromThemeState } from '../_states/fromThemeState.svelte';
	import { fromDashBRouteState, initDashboardRoute } from './_states/fromDashboard.svelte';
	import { fromManageUsersRoute, initManageUsersRoute } from './_states/fromManageUsers.svelte';

	const { data, children } = $props();

	const theme = fromThemeState();

	initManageUsersRoute();
	initDashboardRoute();

	const manageUsersRoute = fromManageUsersRoute();
	const dashboardRoute = fromDashBRouteState();

	$effect(() => {
		manageUsersRoute.setUsers(data.adminQ.data?.users ?? null);
		dashboardRoute.setChurches(data.adminQ.data?.churches ?? null);

		const clientMode = localStorage.getItem('mode-watcher-mode');

		if (clientMode) {
			theme.set(clientMode === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)');
		}
		return;
	});
</script>

{@render children()}
