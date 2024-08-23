<script lang="ts">
	import { ImageUp } from 'lucide-svelte';
	import { onDestroy } from 'svelte';

	interface Props {
		files: FileList | undefined;
		attrs:
			| {
					name: string;
					id: string;
					'data-fs-error': string | undefined;
					'aria-describedby': string | undefined;
					'aria-invalid': 'true' | undefined;
					'aria-required': 'true' | undefined;
					'data-fs-control': string;
			  }
			| undefined;
	}

	let { files = $bindable(), attrs }: Props = $props();

	let previewUrl: string | null = $state(null);

	const readImage = () => {
		const reader = new FileReader();
		if (files?.length) {
			reader.onload = () => {
				previewUrl = reader.result as string;
			};
			reader.readAsDataURL(files[0]);
		}
	};

	onDestroy(() => (files = undefined));
</script>

<label
	class="flex flex-col items-center justify-center gap-[1.25rem] rounded-lg bg-secondary p-[1rem]"
>
	{#if previewUrl}
		<img src={previewUrl} alt="" class="h-[200px] w-full" />
	{:else}
		<ImageUp class="h-[200px] w-[100px]" />
	{/if}

	<span class="text-sm text-muted-foreground">Upload Church Photo</span>
	<input {...attrs} type="file" class="hidden" onchange={readImage} bind:files accept="image/*" />
</label>
