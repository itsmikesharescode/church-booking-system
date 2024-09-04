<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import type { ChurchType, Result } from '$lib/types';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import {
		updateChInfoSchema,
		type UpdateChInfoSchema,
		type UpdateChPhotoSchema
	} from '../../admin-dashboard-schema';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Textarea } from '$lib/components/ui/textarea';
	import { LoaderCircle, X } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import UpdateChPhoto from './_components/UpdateChPhoto.svelte';

	interface Props {
		viewSignal: boolean;
		church: ChurchType;
		updateChInfoForm: SuperValidated<Infer<UpdateChInfoSchema>>;
		updateChPhotoForm: SuperValidated<Infer<UpdateChPhotoSchema>>;
	}

	let { viewSignal = $bindable(), ...props }: Props = $props();

	const form = superForm(props.updateChInfoForm, {
		validators: zodClient(updateChInfoSchema),
		id: crypto.randomUUID(),
		async onUpdate({ result }) {
			const { status, data } = result as Result<{ msg: string }>;

			switch (status) {
				case 200:
					toast.success('', { description: data.msg });
					viewSignal = false;
					form.reset();
					break;
				case 401:
					toast.error('', { description: data.msg });
					form.reset();
					break;
			}
		}
	});

	const { form: formData, enhance, submitting } = form;
</script>

<AlertDialog.Root bind:open={viewSignal}>
	<AlertDialog.Content class="gap-[0.625rem flex max-h-screen max-w-[800px] flex-col p-0">
		<button
			onclick={() => {
				viewSignal = false;
				form.reset();
			}}
			class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
		>
			<X class="h-[20px] w-[20px]" />
			<span class="sr-only">Close</span>
		</button>

		<div class="flex flex-col gap-[0.625rem] overflow-auto">
			<AlertDialog.Header class="px-[2rem] pt-[2rem]">
				<AlertDialog.Title>Church Details</AlertDialog.Title>
				<AlertDialog.Description>
					Viewing details of <strong>{props.church.name}</strong>
				</AlertDialog.Description>
			</AlertDialog.Header>

			<UpdateChPhoto
				bind:viewSignal
				church={props.church}
				updateChPhotoForm={props.updateChPhotoForm}
			/>

			<form
				method="POST"
				action="?/updateChInfoEvent"
				use:enhance
				class="flex flex-col gap-[0.625rem] px-[2rem] pb-[2rem]"
			>
				<Form.Field {form} name="chId" class="hidden">
					<Form.Control let:attrs>
						<Input type="number" {...attrs} value={props.church.id} />
					</Form.Control>
				</Form.Field>

				<Form.Field {form} name="chName">
					<Form.Control let:attrs>
						<Form.Label>Church Name</Form.Label>
						<Input {...attrs} bind:value={$formData.chName} placeholder="Enter new church name" />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="description">
					<Form.Control let:attrs>
						<Form.Label>Church Description</Form.Label>
						<Textarea
							{...attrs}
							bind:value={$formData.description}
							placeholder="Enter new chuch description"
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
								placeholder="Enter new church opening time"
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
								placeholder="Enter new church closing time"
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

						Update Church Details
					</Form.Button>
				</div>
			</form>
		</div>
	</AlertDialog.Content>
</AlertDialog.Root>
