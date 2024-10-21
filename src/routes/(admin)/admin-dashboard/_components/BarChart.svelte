<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import { fromThemeState } from '../../../_states/fromThemeState.svelte';
  import type { AdminQType } from '$lib/types';

  interface Props {
    weeklyIncome: AdminQType['dashboard']['weekly_income'];
  }

  const { weeklyIncome }: Props = $props();

  const theme = fromThemeState();

  let chartCanvas: HTMLCanvasElement | undefined = $state(undefined);
  let chartInstance: Chart | null = $state(null);

  // needs optimize for now lets cohers this sht
  const chartValues: number[] = weeklyIncome.map((item) => item.income);
  const chartLabels: string[] = weeklyIncome.map((item) => item.date);

  onMount(async () => {
    if (typeof window !== 'undefined') {
      createChart();
    }
  });

  function createChart() {
    if (!chartCanvas) return;

    const ctx = chartCanvas.getContext('2d');
    if (!ctx) return;

    chartInstance = new Chart(ctx, {
      type: 'bar',

      data: {
        labels: chartLabels,
        datasets: [
          {
            label: 'Income this week',
            backgroundColor: theme.get(),
            data: chartValues
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
          x: {
            display: true,
            offset: true
          },
          y: {
            display: true,
            offset: true
          }
        },
        plugins: {}
      }
    });
  }

  $effect(() => {
    if (chartInstance) {
      chartInstance.data.datasets[0].backgroundColor = theme.get();
      chartInstance.update();
    }
  });
</script>

<canvas bind:this={chartCanvas} id="myChart"></canvas>

<style>
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
</style>
