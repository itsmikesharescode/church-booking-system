<script lang="ts">
	import ChurchCard from './_components/ChurchCard.svelte';
	import { fromHomeRouteState } from './_states/fromHomeState.svelte';
	import { fromStaticRouteState } from './_states/fromStaticRouteState.svelte';

	const { data } = $props();

	const staticRoute = fromStaticRouteState();
	const homeRoute = fromHomeRouteState();
	staticRoute.setRoute('/');
</script>

<div class="flex flex-col gap-[1.25rem] p-[0.625rem] md:p-[2rem]">
	{#each homeRoute.getChurches() ?? [] as church, index}
		<ChurchCard {church} {index} reservationForm={data.reservationForm} />
	{/each}
</div>
