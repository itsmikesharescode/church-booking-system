<script lang="ts">
	import type { ChurchType, Result } from '$lib/types';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { updateChPhotoSchema, type UpdateChPhotoSchema } from '../../../admin-dashboard-schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form';
	import CustomImageUploader from '$lib/components/gen/CustomImageUploader.svelte';
	import { LoaderCircle } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';

	interface Props {
		viewSignal: boolean;
		church: ChurchType;
		updateChPhotoForm: SuperValidated<Infer<UpdateChPhotoSchema>>;
	}

	let { viewSignal = $bindable(), ...props }: Props = $props();

	const form = superForm(props.updateChPhotoForm, {
		validators: zodClient(updateChPhotoSchema),
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

<form
	method="POST"
	action="?/updateChPhotoEvent"
	enctype="multipart/form-data"
	use:enhance
	class="flex flex-col gap-[0.625rem] px-[2rem] pb-[2rem]"
>
	<Form.Field {form} name="chId" class="hidden">
		<Form.Control let:attrs>
			<Input type="number" {...attrs} value={props.church.id} />
		</Form.Control>
	</Form.Field>

	<Form.Field {form} name="chPhotoPath" class="hidden">
		<Form.Control let:attrs>
			<Input type="text" {...attrs} value={props.church.photo_path} />
		</Form.Control>
	</Form.Field>

	<Form.Field {form} name="chPhoto">
		<Form.Control let:attrs>
			<Form.Label>Church Photo</Form.Label>
			<CustomImageUploader
				hasLink={props.church.photo_path}
				{attrs}
				bind:file={$formData.chPhoto}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<div class="flex justify-end">
		<Form.Button disabled={$submitting} class="relative">
			{#if $submitting}
				<div
					class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
				>
					<LoaderCircle class="h-[20px] w-[20px] animate-spin" />
				</div>
			{/if}

			Update Church Photo
		</Form.Button>
	</div>
</form>
