<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import '@fontsource-variable/lora';

	const { data, children } = $props();
</script>

<ModeWatcher />
<Toaster />
{@render children()}

<style>
	:global(html) {
		font-family: 'Lora Variable', serif;
	}
</style>
