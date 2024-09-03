<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import '@fontsource-variable/lora';
	import Footer from '$lib/components/gen/Footer.svelte';
	import NormalNav from './_components/NormalNav.svelte';
	import { initStaticRoute } from './_states/fromStaticRouteState.svelte';
	import { fromUserState, initUserState } from './_states/fromUserState.svelte';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import { fromSupabaseState, initSupabase } from './_states/fromSupabaseState.svelte';
	import { page } from '$app/stores';
	import { fromCachingState, initCaching } from './_states/fromCachingState.svelte';
	import { onNavigate } from '$app/navigation';
	import { fromThemeState, initTheme } from './_states/fromThemeState.svelte';

	const { data, children } = $props();

	initUserState();
	initSupabase();
	initStaticRoute();
	initCaching();
	initTheme();

	const user = fromUserState();
	const supabase = fromSupabaseState();
	const caching = fromCachingState();
	const theme = fromThemeState();

	caching.setCaching(crypto.randomUUID());

	onMount(() => {
		const { data: sub } = data.supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== data.session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => sub.subscription.unsubscribe();
	});

	$effect(() => {
		user.setUser(data.user);
		supabase.set(data.supabase);
	});

	onNavigate((navigation) => {
		//@ts-ignore
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			//@ts-ignore
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<ModeWatcher />
<Toaster richColors={true} />
{#if $page.url.pathname !== '/authenticate/update-password'}
	<NormalNav />
{/if}

{@render children()}

<style>
	:global(html) {
		font-family: 'Lora Variable', serif;
	}
</style>
