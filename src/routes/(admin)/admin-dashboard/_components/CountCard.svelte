<script lang="ts">
	interface Props {
		title: string;
		count: number;
		sign: string;
	}

	const { title, count, sign }: Props = $props();
</script>

<div class="flex flex-col items-center justify-center border-[1px] border-primary p-[1rem]">
	<p>{title}</p>
	<p class="text-6xl font-semibold">{sign}{count.toLocaleString()}</p>
</div>
