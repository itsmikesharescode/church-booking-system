import type { UserQType } from '$lib/types';
import { getContext, setContext } from 'svelte';

class ReservationRoute {
  private reservations = $state<UserQType['reservations'] | null>(null);

  setReservations(p: UserQType['reservations'] | null) {
    this.reservations = p;
  }

  getReservations() {
    return this.reservations;
  }

  private payments = $state<UserQType['payments'] | null>(null);

  setPayments(p: UserQType['payments'] | null) {
    this.payments = p;
  }

  getPayments() {
    return this.payments;
  }
}

const RESERVATION_ROUTE_KEY = Symbol('ReservationRouteKey');

export const initReservationRoute = () => {
  return setContext(RESERVATION_ROUTE_KEY, new ReservationRoute());
};

export const fromReservationRoute = () => {
  return getContext<ReturnType<typeof initReservationRoute>>(RESERVATION_ROUTE_KEY);
};
