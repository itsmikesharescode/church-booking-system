import type { User } from '@supabase/supabase-js';
import { getContext, setContext } from 'svelte';

const routes = {
  noUser: [{ name: 'Home', url: '/' }],
  hasUser: [
    { name: 'Home', url: '/' },
    { name: 'My Reservations', url: '/my-reservations' },
    { name: 'Profile', url: '/profile' }
  ],
  hasAdmin: [
    { name: 'Dashboard', url: '/admin-dashboard' },
    { name: 'Event Reservations', url: '/admin-event-reservations' },
    { name: 'Manage Users', url: '/admin-manage-users' }
  ]
};

class StaticRoute {
  private route = $state('');

  setRoute(p: string) {
    this.route = p;
  }

  getRoute() {
    return this.route;
  }

  getRoutes(p: User | null) {
    if (p) {
      const { role } = p.user_metadata;
      if (role === 'admin') return routes.hasAdmin;
      return routes.hasUser;
    }
    return routes.noUser;
  }
}

const STATIC_ROUTE_KEY = Symbol('staticRouteKey');

export const initStaticRoute = () => {
  return setContext(STATIC_ROUTE_KEY, new StaticRoute());
};

export const fromStaticRouteState = () => {
  return getContext<ReturnType<typeof initStaticRoute>>(STATIC_ROUTE_KEY);
};
