<script lang="ts">
	import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';

	const staticRoute = fromStaticRouteState();

	staticRoute.setRoute('/admin-event-reservations');
</script>

<div class="">reservations</div>
