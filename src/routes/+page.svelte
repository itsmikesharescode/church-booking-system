<script lang="ts">
	import ChurchCard from './_components/ChurchCard.svelte';
</script>

<div class="p-[0.625rem] md:p-[2rem]">
	{#each Array(15) as _}
		<ChurchCard />
	{/each}
</div>
