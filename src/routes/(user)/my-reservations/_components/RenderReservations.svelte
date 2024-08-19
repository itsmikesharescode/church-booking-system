<script lang="ts">
	import ViewReservation from './_operations/ViewReservation.svelte';
</script>

<div class="flex flex-col">
	<div
		class="sticky top-[4.8rem] hidden bg-secondary p-[1rem] text-sm font-semibold sm:grid sm:grid-cols-[50%,30%,20%] md:grid-cols-[40%,30%,15%,15%]"
	>
		<p>CLIENT NAME</p>
		<p class="hidden md:block">REFERENCE NUMBER</p>
		<p>STATUS</p>
	</div>

	<div class="">
		{#each Array(20) as _}
			<div
				class="grid border-b-[1px] p-[1rem] text-sm sm:grid-cols-[50%,30%,20%] md:grid-cols-[40%,30%,15%,15%]"
			>
				<p class="flex items-center">Eviota, Mike John Baguinaon</p>
				<p class="hidden items-center md:flex">WD-000002</p>
				<p class="flex items-center">Reserved</p>
				<div class="flex items-center justify-end p-2">
					<ViewReservation />
				</div>
			</div>
		{/each}
	</div>
</div>
