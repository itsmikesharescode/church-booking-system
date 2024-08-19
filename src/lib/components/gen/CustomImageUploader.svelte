<script lang="ts">
	import { ImageUp } from 'lucide-svelte';
	import { onDestroy } from 'svelte';

	interface Props {
		file: FileList | undefined;
		attrs: {
			name: string;
			id: string;
			'data-fs-error': string | undefined;
			'aria-describedby': string | undefined;
			'aria-invalid': 'true' | undefined;
			'aria-required': 'true' | undefined;
			'data-fs-control': string;
		};
	}

	let { file = $bindable(), attrs }: Props = $props();

	let previewUrl: string | null = $state(null);

	const readImage = () => {
		const reader = new FileReader();
		if (file) {
			reader.onload = () => {
				previewUrl = reader.result as string;
			};
			reader.readAsDataURL(file[0]);
		}
	};

	onDestroy(() => (file = undefined));
</script>

<div class="bg-secondary p-[2rem]">
	<label
		class="mx-auto flex max-w-fit flex-col items-center justify-center gap-[1.25rem] rounded-lg bg-white p-[1rem]"
	>
		{#if previewUrl}
			<img src={previewUrl} alt="" class="h-[100px] w-[100px]" />
		{:else}
			<ImageUp class="h-[100px] w-[100px]" />
		{/if}

		<span class="text-sm text-muted-foreground">Upload Resto Photo</span>
		<input
			{...attrs}
			type="file"
			class="hidden"
			onchange={readImage}
			bind:files={file}
			accept="image/*"
		/>
	</label>
</div>
