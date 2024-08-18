import { getContext, setContext } from 'svelte';

class StaticRoute {
	private route = $state('');

	setRoute(p: string) {
		this.route = p;
	}

	getRoute() {
		return this.route;
	}
}

const STATIC_ROUTE_KEY = Symbol('staticRouteKey');

export const initStaticRoute = () => {
	return setContext(STATIC_ROUTE_KEY, new StaticRoute());
};

export const fromStaticRouteState = () => {
	return getContext<ReturnType<typeof initStaticRoute>>(STATIC_ROUTE_KEY);
};
