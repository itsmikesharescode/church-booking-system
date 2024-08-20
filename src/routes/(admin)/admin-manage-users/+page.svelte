<script lang="ts">
	import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';

	const staticRoute = fromStaticRouteState();

	staticRoute.setRoute('/admin-manage-users');
</script>

<div class="">manage users</div>
