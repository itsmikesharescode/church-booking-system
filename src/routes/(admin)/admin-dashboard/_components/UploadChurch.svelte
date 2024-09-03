<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { upChSchema, type UpChSchema } from '../admin-dashboard-schema';
	import Button from '$lib/components/ui/button/button.svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import CustomDate from '$lib/components/gen/CustomDate.svelte';
	import CustomImageUploader from '$lib/components/gen/CustomImageUploader.svelte';
	import { LoaderCircle, X } from 'lucide-svelte';
	import type { Result } from '$lib/types';
	import { toast } from 'svelte-sonner';

	interface Props {
		upChForm: SuperValidated<Infer<UpChSchema>>;
	}

	const { ...props }: Props = $props();

	let open = $state(false);

	const form = superForm(props.upChForm, {
		validators: zodClient(upChSchema),
		id: crypto.randomUUID(),
		async onUpdate({ result }) {
			const { status, data } = result as Result<{ msg: string }>;

			switch (status) {
				case 200:
					toast.success('', { description: data.msg });
					form.reset();
					open = false;
					break;
				case 401:
					toast.error('', { description: data.msg });
					break;
			}
		}
	});

	const { form: formData, enhance, submitting } = form;
</script>

<Button onclick={() => (open = true)}>Add Church</Button>

<AlertDialog.Root bind:open>
	<AlertDialog.Content class="gap-[0.625rem flex max-h-screen max-w-[800px] flex-col p-0">
		<button
			onclick={() => {
				open = false;
				form.reset();
			}}
			class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
		>
			<X class="h-[20px] w-[20px]" />
			<span class="sr-only">Close</span>
		</button>

		<AlertDialog.Header class="px-[2rem] pt-[2rem]">
			<AlertDialog.Title>Add Church</AlertDialog.Title>
			<AlertDialog.Description>
				Answer the fields and upload church photo to add a church in our database.
			</AlertDialog.Description>
		</AlertDialog.Header>

		<form
			method="POST"
			action="?/upLoadChEvent"
			enctype="multipart/form-data"
			use:enhance
			class="flex flex-col gap-[0.625rem] overflow-auto px-[2rem] pb-[2rem]"
		>
			<Form.Field {form} name="chPhoto">
				<Form.Control let:attrs>
					<Form.Label>Church Photo</Form.Label>
					<CustomImageUploader {attrs} bind:file={$formData.chPhoto} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="chName">
				<Form.Control let:attrs>
					<Form.Label>Church Name</Form.Label>
					<Input {...attrs} bind:value={$formData.chName} placeholder="Enter church name" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="description">
				<Form.Control let:attrs>
					<Form.Label>Church Description</Form.Label>
					<Textarea
						{...attrs}
						bind:value={$formData.description}
						placeholder="Enter chuch description"
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<div class="grid gap-[0.625rem] md:grid-cols-2">
				<Form.Field {form} name="openT">
					<Form.Control let:attrs>
						<Form.Label>Opening Time</Form.Label>
						<Input
							{...attrs}
							bind:value={$formData.openT}
							placeholder="Enter church opening time"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="closeT">
					<Form.Control let:attrs>
						<Form.Label>Closing Time</Form.Label>
						<Input
							{...attrs}
							bind:value={$formData.closeT}
							placeholder="Enter church closing time"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<div class="flex justify-end">
				<Form.Button disabled={$submitting} class="relative">
					{#if $submitting}
						<div
							class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
						>
							<LoaderCircle class="h-[20px] w-[20px] animate-spin" />
						</div>
					{/if}

					Upload
				</Form.Button>
			</div>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
