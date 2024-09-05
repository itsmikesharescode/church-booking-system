import type { AdminQType } from '$lib/types';
import { getContext, setContext } from 'svelte';

class ReservationsRoute {
	private bookings = $state<AdminQType['bookings'] | null>(null);

	setBookings(p: AdminQType['bookings'] | null) {
		this.bookings = p;
	}

	getBookings() {
		return this.bookings;
	}
}

const RESERVATIONS_ROUTE_KEY = Symbol('reservationRouteKey');

export const initReservationRoute = () => {
	return setContext(RESERVATIONS_ROUTE_KEY, new ReservationsRoute());
};

export const fromReservationRouteState = () => {
	return getContext<ReturnType<typeof initReservationRoute>>(RESERVATIONS_ROUTE_KEY);
};
