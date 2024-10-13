import type { AdminQType, ChurchType } from '$lib/types';
import { getContext, setContext } from 'svelte';

class DashboardRoute {
	private churches = $state<ChurchType[] | null>(null);

	setChurches(p: ChurchType[] | null) {
		this.churches = p;
	}

	getChurches() {
		return this.churches;
	}

	private dashboard = $state<AdminQType['dashboard'] | null>(null);

	setDashboard(p: AdminQType['dashboard'] | null) {
		this.dashboard = p;
	}

	getDashboard() {
		return this.dashboard;
	}
}

const DASHBOARD_ROUTE_KEY = Symbol('DashboardRoute');

export const initDashboardRoute = () => {
	return setContext(DASHBOARD_ROUTE_KEY, new DashboardRoute());
};

export const fromDashBRouteState = () => {
	return getContext<ReturnType<typeof initDashboardRoute>>(DASHBOARD_ROUTE_KEY);
};
