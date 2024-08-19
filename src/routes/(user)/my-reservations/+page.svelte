<script lang="ts">
	import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';

	const staticRoute = fromStaticRouteState();

	staticRoute.setRoute('/my-reservations');
</script>

<div class="">weeew</div>
