<script lang="ts">
	import CustomRangeDate from '$lib/components/gen/CustomRangeDate.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';
	import { fromReservationRouteState } from '../_states/fromReservations.svelte';
	import Pagination from './_components/_operations/Pagination.svelte';
	import RenderEvents from './_components/RenderEvents.svelte';
	import RenderSchedules from './_components/RenderSchedules.svelte';

	const { data } = $props();

	const staticRoute = fromStaticRouteState();

	staticRoute.setRoute('/admin-event-reservations');
	const reservationRoute = fromReservationRouteState();
</script>

<div class="flex flex-col gap-[2rem] p-[1rem] sm:p-[2rem]">
	<section class="flex flex-col gap-[0.625rem]">
		<p class="text-3xl font-semibold">Requests</p>
		<div class="flex justify-end">
			<div class="max-w-fit">
				<Pagination />
			</div>
		</div>
		<RenderEvents
			bookings={reservationRoute.getBookings()}
			updateStatusEventForm={data.updateStatusEventForm}
		/>
	</section>
	<Separator />
	<section class="flex flex-col gap-[0.625rem]">
		<p class="text-3xl font-semibold">Schedules</p>
		<CustomRangeDate />
		<RenderSchedules />
	</section>
</div>
