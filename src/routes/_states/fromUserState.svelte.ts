import { getContext, setContext } from 'svelte';

class UserState {
	private user = $state<unknown | null>(null);

	setUser(p: unknown | null) {
		this.user = p;
	}

	getUser() {
		return this.user;
	}
}

const USER_KEY = Symbol('userKey');

export const initUserState = () => {
	return setContext(USER_KEY, new UserState());
};

export const fromUserState = () => {
	return getContext<ReturnType<typeof initUserState>>(USER_KEY);
};
