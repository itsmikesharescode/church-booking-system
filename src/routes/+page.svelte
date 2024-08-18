<script lang="ts">
	import ChurchCard from './_components/ChurchCard.svelte';
	import { fromStaticRouteState } from './_states/fromStaticRouteState.svelte';

	const { data } = $props();

	const staticRoute = fromStaticRouteState();

	staticRoute.setRoute('/');
</script>

<div class="p-[0.625rem] md:p-[2rem]">
	{#each Array(15) as _}
		<ChurchCard reservationForm={data.reservationForm} />
	{/each}
</div>
