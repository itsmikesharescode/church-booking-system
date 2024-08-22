<script lang="ts">
	import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';
	import BarChart from './_components/BarChart.svelte';
	import CountCard from './_components/CountCard.svelte';
	import LineChart from './_components/LineChart.svelte';

	const staticRoute = fromStaticRouteState();

	staticRoute.setRoute('/admin-dashboard');
</script>

<div class="flex flex-col gap-[2rem] p-[1rem] md:p-[2rem]">
	<div class="grid min-h-[30dvh] gap-[0.625rem] md:grid-cols-2">
		<div class="">
			<LineChart first={1} sec={3} third={3} fourth={10} fifth={5} sixth={6} />
		</div>

		<div class="">
			<BarChart first={1} sec={3} third={3} fourth={10} fifth={5} sixth={6} />
		</div>
	</div>

	<div class="grid grid-cols-4 gap-[1rem]">
		<CountCard title="Total Reservation" count={30} />

		<CountCard title="Total Users" count={10100} />

		<CountCard title="Approved Reservation" count={1230} />
		<CountCard title="Active Reservation" count={500} />
	</div>
</div>
