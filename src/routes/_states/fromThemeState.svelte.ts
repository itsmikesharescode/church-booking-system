import { getContext, setContext } from 'svelte';

class ThemeState {
	private themeColor = $state('rgb(0, 0, 0)');

	set(c: string) {
		this.themeColor = c;
	}

	get() {
		return this.themeColor;
	}
}

const THEME_KEY = Symbol('themeStateKey');

export const initTheme = () => {
	return setContext(THEME_KEY, new ThemeState());
};

export const fromThemeState = () => {
	return getContext<ReturnType<typeof initTheme>>(THEME_KEY);
};
