<script lang="ts">
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';
  import { fromDashBRouteState } from '../_states/fromDashboard.svelte';
  import BarChart from './_components/charts/bar-chart.svelte';
  import CountCard from './_components/count-card/count-card.svelte';
  import LineChart from './_components/charts/line-chart.svelte';
  import Table from './_components/table/components/table.svelte';
  import { columns } from './_components/table/components/columns';
  import DeleteChurch from './_components/delete-church/delete-church.svelte';
  import { initTableState } from './_components/table/tableState.svelte';
  import AddChurch from './_components/add-church/add-church.svelte';
  import UpdateChurch from './_components/update-church/update-church.svelte';
  const { data } = $props();

  initTableState();

  const staticRoute = fromStaticRouteState();
  const dashboardRoute = fromDashBRouteState();

  staticRoute.setRoute('/admin-dashboard');

  const getTotalWeeklyReservation = () => {
    const copy = dashboardRoute.getDashboard()?.weekly_approve;
    if (!copy) return 0;

    return copy.map((item) => item.count).reduce((curr, acc) => curr + acc);
  };

  const getTotalWeeklyIncome = () => {
    const copy = dashboardRoute.getDashboard()?.weekly_income;
    if (!copy) return 0;

    return copy.map((item) => item.income).reduce((curr, acc) => curr + acc);
  };
</script>

<div class="flex flex-col gap-[1.25rem] p-[1rem] md:p-[2rem] md:pb-[5rem]">
  <div class="grid gap-[0.625rem] md:grid-cols-2">
    <div class="max-h-[30dvh]">
      <LineChart weeklyApproved={dashboardRoute.getDashboard()?.weekly_approve ?? []} />
    </div>

    <div class="max-h-[30dvh]">
      <BarChart weeklyIncome={dashboardRoute.getDashboard()?.weekly_income ?? []} />
    </div>
  </div>

  <div class="grid gap-[1rem] lg:grid-cols-4">
    <CountCard
      sign=""
      title="Total Reservation"
      count={dashboardRoute.getDashboard()?.total_reservation ?? 0}
    />

    <CountCard
      sign=""
      title="Total Users"
      count={dashboardRoute.getDashboard()?.total_users ?? 0}
    />

    <CountCard sign="" title="Weekly Approved Reservation" count={getTotalWeeklyReservation()} />
    <CountCard sign="₱" title="Weekly Total Income" count={getTotalWeeklyIncome()} />
  </div>

  <Separator />

  <div class="flex flex-col gap-[1rem]">
    <div class="flex flex-col items-center gap-[1rem] md:flex-row md:justify-between">
      <AddChurch addChurchForm={data.addChurchForm} />
    </div>

    <Table {columns} data={dashboardRoute.getChurches() ?? []} />
  </div>
</div>

<DeleteChurch />
<UpdateChurch
  updateChurchInfoForm={data.updateChurchInfoForm}
  updateChurchPhotoForm={data.updateChurchPhotoForm}
/>
