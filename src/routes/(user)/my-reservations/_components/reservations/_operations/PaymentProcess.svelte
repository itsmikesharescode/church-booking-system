<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { MoveUpRight } from 'lucide-svelte';
</script>

<button
	class="flex items-center gap-[0.5rem] bg-yellow-500 px-[0.5rem] font-semibold text-black transition-all hover:scale-105 active:scale-95"
>
	Proceed Payment <MoveUpRight class="h-[15px] w-[15px]" />
</button>
