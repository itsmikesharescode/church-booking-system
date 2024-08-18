<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import '@fontsource-variable/lora';
	import Footer from '$lib/components/gen/Footer.svelte';
	import NormalNav from './_components/NormalNav.svelte';
	import { initStaticRoute } from './_states/fromStaticRouteState.svelte';
	import { initUserState } from './_states/fromUserState.svelte';

	const { data, children } = $props();

	initUserState();
	initStaticRoute();
</script>

<ModeWatcher />
<Toaster />
<NormalNav />
{@render children()}

<style>
	:global(html) {
		font-family: 'Lora Variable', serif;
	}
</style>
