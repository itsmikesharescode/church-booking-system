<script lang="ts">
	import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';
	import RenderReservations from './_components/RenderReservations.svelte';

	const staticRoute = fromStaticRouteState();

	staticRoute.setRoute('/my-reservations');
</script>

<div class="">
	<RenderReservations />
</div>
