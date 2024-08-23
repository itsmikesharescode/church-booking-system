<script lang="ts">
	import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';
	import Pagination from './_components/_operations/Pagination.svelte';
	import RenderEvents from './_components/RenderEvents.svelte';

	const { data } = $props();

	const staticRoute = fromStaticRouteState();

	staticRoute.setRoute('/admin-event-reservations');
</script>

<div class="flex flex-col gap-[2rem] p-[1rem] sm:p-[2rem]">
	<div class="sticky top-[4.5rem] z-10 flex justify-end">
		<div class="max-w-fit">
			<Pagination />
		</div>
	</div>
	<RenderEvents updateStatusEventForm={data.updateStatusEventForm} />
</div>
