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

	const { data, children } = $props();

	initUserState();
	initStaticRoute();

	const user = fromUserState();
	user.setUser(data.user);

	onMount(() => {
		const { data: sub } = data.supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== data.session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => sub.subscription.unsubscribe();
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
