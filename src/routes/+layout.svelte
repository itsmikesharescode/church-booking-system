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

	const { data, children } = $props();

	initUserState();
	initSupabase();
	initStaticRoute();

	const user = fromUserState();
	const supabase = fromSupabaseState();

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
</script>

<ModeWatcher />
<Toaster richColors={true} />
<NormalNav />
{@render children()}

<style>
	:global(html) {
		font-family: 'Lora Variable', serif;
	}
</style>
