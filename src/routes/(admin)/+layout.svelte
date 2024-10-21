<script lang="ts">
  import { fromThemeState } from '../_states/fromThemeState.svelte';
  import { fromDashBRouteState, initDashboardRoute } from './_states/fromDashboard.svelte';
  import { fromManageUsersRoute, initManageUsersRoute } from './_states/fromManageUsers.svelte';
  import {
    fromReservationRouteState,
    initReservationRoute
  } from './_states/fromReservations.svelte';

  const { data, children } = $props();

  const theme = fromThemeState();

  initManageUsersRoute();
  initDashboardRoute();
  initReservationRoute();

  const manageUsersRoute = fromManageUsersRoute();
  const reservationRoute = fromReservationRouteState();
  const dashboardRoute = fromDashBRouteState();

  $effect(() => {
    manageUsersRoute.setUsers(data.adminQ.data?.users ?? null);
    reservationRoute.setBookings(data.adminQ.data?.bookings ?? null);
    reservationRoute.setPayments(data.adminQ.data?.payments ?? null);
    dashboardRoute.setChurches(data.adminQ.data?.churches ?? null);
    dashboardRoute.setDashboard(data.adminQ.data?.dashboard ?? null);

    const clientMode = localStorage.getItem('mode-watcher-mode');

    if (clientMode) {
      theme.set(clientMode === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)');
    }
    return;
  });
</script>

{@render children()}
