<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import { fromThemeState } from '../../../_states/fromThemeState.svelte';

	interface Props {
		first: number | null;
		sec: number | null;
		third: number | null;
		fourth: number | null;
		fifth: number | null;
		sixth: number | null;
	}

	const { first, sec, third, fourth, fifth, sixth }: Props = $props();

	const theme = fromThemeState();

	let chartCanvas: HTMLCanvasElement | undefined = $state(undefined);
	let chartInstance: Chart | null = $state(null);

	const chartValues: number[] = [
		first ?? 0,
		sec ?? 0,
		third ?? 0,
		fourth ?? 0,
		fifth ?? 0,
		sixth ?? 0
	];
	const chartLabels: string[] = ['1', '2', '3', '4', '5', '6'];

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
			type: 'line', // Changed to 'line'
			data: {
				labels: chartLabels,
				datasets: [
					{
						label: 'Users this week',
						backgroundColor: theme.get(),
						borderColor: theme.get(), // Added borderColor for line chart
						data: chartValues,
						fill: false, // Optional: prevents the area under the line from being filled bla bla bla
						tension: 0.4
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
		//for reactive darkmode
		if (chartInstance) {
			chartInstance.data.datasets[0].backgroundColor = theme.get();
			chartInstance.data.datasets[0].borderColor = theme.get();
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
