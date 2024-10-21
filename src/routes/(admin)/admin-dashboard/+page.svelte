<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';
  import { fromDashBRouteState } from '../_states/fromDashboard.svelte';
  import Pagination from './_components/_operations/Pagination.svelte';
  import BarChart from './_components/BarChart.svelte';
  import CountCard from './_components/CountCard.svelte';
  import LineChart from './_components/LineChart.svelte';
  import RenderChurch from './_components/RenderChurch.svelte';
  import UploadChurch from './_components/UploadChurch.svelte';

  const { data } = $props();

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

<div class="flex flex-col gap-[1.25rem] p-[1rem] md:p-[2rem]">
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
      <UploadChurch upChForm={data.upChForm} />

      <div class="">
        <!-- <Pagination /> -->
      </div>
    </div>
    <RenderChurch
      updateChPhotoForm={data.updateChPhotoForm}
      updateChInfoForm={data.updateChInfoForm}
    />
  </div>
</div>
