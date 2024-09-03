import type { UserType } from '$lib/types';
import { getContext, setContext } from 'svelte';

class ManageUsersRoute {
	private users = $state<UserType[] | null>(null);
	private active = $state<UserType | null>(null);

	setUsers(p: UserType[] | null) {
		this.users = p;
	}

	getUsers() {
		return this.users;
	}

	setActive(p: UserType | null) {
		this.active = p;
	}

	getActive() {
		return this.active;
	}
}

const MANAGEUSERS_ROUTE_KEY = Symbol('manageUsersRouteKey');

export const initManageUsersRoute = () => {
	return setContext(MANAGEUSERS_ROUTE_KEY, new ManageUsersRoute());
};

export const fromManageUsersRoute = () => {
	return getContext<ReturnType<typeof initManageUsersRoute>>(MANAGEUSERS_ROUTE_KEY);
};
