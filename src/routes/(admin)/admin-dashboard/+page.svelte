<script lang="ts">
	import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';

	const staticRoute = fromStaticRouteState();

	staticRoute.setRoute('/admin-dashboard');
</script>

<div class="">dashboard</div>
