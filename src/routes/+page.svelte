<script lang="ts">
	import ChurchCard from './_components/ChurchCard.svelte';
	import { fromStaticRouteState } from './_states/fromStaticRouteState.svelte';

	const { data } = $props();

	const staticRoute = fromStaticRouteState();

	staticRoute.setRoute('/');
</script>

<div class="flex flex-col gap-[1.25rem] p-[0.625rem] md:p-[2rem]">
	{#each data.churches.data ?? [] as church, index}
		<ChurchCard {church} {index} reservationForm={data.reservationForm} />
	{/each}
</div>
