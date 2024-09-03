<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';
	import Pagination from './_components/_operations/Pagination.svelte';
	import BarChart from './_components/BarChart.svelte';
	import CountCard from './_components/CountCard.svelte';
	import LineChart from './_components/LineChart.svelte';
	import RenderChurch from './_components/RenderChurch.svelte';
	import UploadChurch from './_components/UploadChurch.svelte';

	const { data } = $props();

	const staticRoute = fromStaticRouteState();

	staticRoute.setRoute('/admin-dashboard');
</script>

<div class="flex flex-col gap-[1.25rem] p-[1rem] md:p-[2rem]">
	<div class="grid gap-[0.625rem] md:grid-cols-2">
		<div class="max-h-[30dvh]">
			<LineChart first={1} sec={3} third={3} fourth={10} fifth={5} sixth={6} />
		</div>

		<div class="max-h-[30dvh]">
			<BarChart first={1} sec={3} third={3} fourth={10} fifth={5} sixth={6} />
		</div>
	</div>

	<div class="grid gap-[1rem] lg:grid-cols-4">
		<CountCard title="Total Reservation" count={30} />

		<CountCard title="Total Users" count={10100} />

		<CountCard title="Approved Reservation" count={1230} />
		<CountCard title="Active Reservation" count={500} />
	</div>

	<Separator />

	<div class="flex flex-col gap-[1rem]">
		<div class="flex flex-col items-center gap-[1rem] md:flex-row md:justify-between">
			<UploadChurch upChForm={data.upChForm} />

			<div class="">
				<Pagination />
			</div>
		</div>
		<RenderChurch />
	</div>
</div>
