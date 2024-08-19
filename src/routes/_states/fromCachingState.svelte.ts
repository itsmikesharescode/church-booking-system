import { getContext, setContext } from 'svelte';

class Caching {
	private cachingVal = $state('');

	setCaching(p: string) {
		this.cachingVal = p;
	}

	getCaching() {
		return this.cachingVal;
	}
}

const CACHING_KEY = Symbol('cachingKey');

export const initCaching = () => {
	return setContext(CACHING_KEY, new Caching());
};

export const fromCachingState = () => {
	return getContext<ReturnType<typeof initCaching>>(CACHING_KEY);
};
