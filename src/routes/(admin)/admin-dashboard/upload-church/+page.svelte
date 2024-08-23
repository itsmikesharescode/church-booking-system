<script lang="ts">
	import { fromStaticRouteState } from '../../../_states/fromStaticRouteState.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { Result } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { Loader, X, Upload } from 'lucide-svelte';
	import { uploadChurchSchema, type UploadChurchTypes } from './upload-church-schema';
	import Button from '$lib/components/ui/button/button.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import CustomImageUploader from '$lib/components/gen/CustomImageUploader.svelte';
	import { flip } from 'svelte/animate';

	const { data } = $props();

	const staticRoute = fromStaticRouteState();

	staticRoute.setRoute('/admin-dashboard');

	let answerContainer = $state<UploadChurchTypes>({
		churchName: '',
		description: '',
		images: [
			{
				id: crypto.randomUUID(),
				files: undefined,
				imageTitle: '',
				description: ''
			}
		]
	});
</script>

<div class="flex flex-col gap-[2rem] p-[1rem] sm:p-[2rem]">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/">Dashboard</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>Upload Church</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>

	<div class="flex flex-col gap-[0.625rem]">
		<div class="flex flex-col gap-[0.625rem]">
			<Label for="email">Church Name</Label>
			<Input type="email" id="email" placeholder="Enter church name" />
		</div>

		<div class="flex flex-col gap-[0.625rem]">
			<Label for="email">Church Description</Label>
			<Textarea id="email" placeholder="Enter church description" />
		</div>

		<Label for="email">Church Images</Label>
		<div class="flex flex-col gap-[0.625rem] p-[1rem]">
			{#each answerContainer.images as image (image)}
				<div class="flex flex-col gap-[0.625rem]" animate:flip={{ duration: 450 }}>
					<div class="relative flex flex-col gap-[0.625rem]">
						{#if answerContainer.images.length > 1}
							<button
								onclick={() => {
									if (answerContainer.images.length > 1) {
										answerContainer.images = answerContainer.images.filter(
											(item) => item.id !== image.id
										);
									}
								}}
								class="absolute right-4 top-4 rounded-sm bg-red-500 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
							>
								<X />
								<span class="sr-only">Close</span>
							</button>
						{/if}

						<Label for="email">Church Image</Label>
						<CustomImageUploader attrs={undefined} bind:files={image.files} />
					</div>

					<div class="flex flex-col gap-[0.625rem]">
						<Label for="email">Image Title</Label>
						<Input id="email" placeholder="Enter image title" bind:value={image.imageTitle} />
					</div>

					<div class="flex flex-col gap-[0.625rem]">
						<Label for="email">Image Description</Label>
						<Textarea
							id="email"
							placeholder="Enter image description"
							bind:value={image.description}
						/>
					</div>
				</div>
			{/each}

			{#if !(answerContainer.images.length > 2)}
				<div class="flex justify-end">
					<Button
						onclick={() => {
							if (!(answerContainer.images.length > 2)) {
								answerContainer.images.push({
									id: crypto.randomUUID(),
									files: undefined,
									imageTitle: '',
									description: ''
								});
							}
						}}
					>
						More Photo
					</Button>
				</div>
			{/if}
		</div>

		<div class="flex justify-end">
			<Button class="gap-[5px]">Upload Church <Upload class="h-[15px] w-[15px]" /></Button>
		</div>
	</div>
</div>
