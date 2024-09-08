<script lang="ts">
	import { fromReservationRoute } from '../../_states/fromReservationState.svelte';
	import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';
	import RenderPayments from './_components/payments/RenderPayments.svelte';
	import PaymentPagination from './_components/payments/_operations/PaymentPagination.svelte';
	import RenderReservations from './_components/reservations/RenderReservations.svelte';
	import ReservationPagination from './_components/reservations/_operations/ReservationPagination.svelte';

	const staticRoute = fromStaticRouteState();
	const reservationRoute = fromReservationRoute();

	staticRoute.setRoute('/my-reservations');
</script>

<div class="f flex flex-col gap-[3rem] p-[1rem] sm:p-[2rem]">
	<div class="">
		<p class="text-3xl font-semibold">Reservations</p>
		<div class="flex justify-end">
			<div class="max-w-fit">
				<ReservationPagination />
			</div>
		</div>
		<RenderReservations bookings={reservationRoute.getReservations()} />
	</div>

	<div class="">
		<p class="text-3xl font-semibold">Payments</p>
		<div class="flex justify-end">
			<div class="max-w-fit">
				<PaymentPagination />
			</div>
		</div>
		<RenderPayments payments={reservationRoute.getPayments()} />
	</div>
</div>
