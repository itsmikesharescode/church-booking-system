import type { UserQType } from '$lib/types';
import { getContext, setContext } from 'svelte';

class HomeRoute {
  private churches = $state<UserQType['churches'] | null>(null);

  setChurches(p: UserQType['churches'] | null) {
    this.churches = p;
  }

  getChurches() {
    return this.churches;
  }
}

const HOME_ROUTE_KEY = Symbol('HomeRouteKey');

export const initHomeRoute = () => {
  return setContext(HOME_ROUTE_KEY, new HomeRoute());
};

export const fromHomeRouteState = () => {
  return getContext<ReturnType<typeof initHomeRoute>>(HOME_ROUTE_KEY);
};
