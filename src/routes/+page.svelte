<script lang="ts">
	import { Church } from 'lucide-svelte';
	import ChurchCard from './_components/ChurchCard.svelte';
	import DarkMode from '$lib/components/gen/DarkMode.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	const { data } = $props();
</script>

<nav class="sticky top-0 z-10 flex justify-between border-b-[1px] p-[1rem] backdrop-blur-lg">
	<div class="flex items-center gap-[0.625rem]">
		<DarkMode />
		<p class="text-2xl font-bold">Church Booking System</p>
	</div>

	<div class="flex items-center gap-[0.625rem]">
		<Button>Sign In</Button>
		<Button>Sign Up Free</Button>
	</div>
</nav>
<div class="p-[0.625rem] md:p-[2rem]">
	{#each Array(15) as _}
		<ChurchCard reservationForm={data.reservationForm} />
	{/each}
</div>
