<script lang="ts">
	import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';
	import RenderReservations from './_components/RenderReservations.svelte';

	const { data } = $props();

	const staticRoute = fromStaticRouteState();

	staticRoute.setRoute('/my-reservations');
</script>

<div class="p-[1rem] sm:p-[2rem]">
	<RenderReservations bookings={data.bookings.data} />
</div>
