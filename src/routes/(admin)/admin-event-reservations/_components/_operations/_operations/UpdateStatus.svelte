<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { updateStatusEventSchema, type UpdateStatusEventSchema } from './event-schema';

	interface Props {
		updateSignal: boolean;
		updateStatusEventForm: SuperValidated<Infer<UpdateStatusEventSchema>>;
	}

	let { updateSignal = $bindable(), updateStatusEventForm }: Props = $props();

	const form = superForm(updateStatusEventForm, {
		validators: zodClient(updateStatusEventSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});

	const { form: formData, enhance } = form;

	const selectedStatus = $derived(
		$formData.status ? { label: $formData.status, value: $formData.status } : undefined
	);
</script>

<AlertDialog.Root bind:open={updateSignal}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Update Status</AlertDialog.Title>
			<AlertDialog.Description>
				Updating status of Mike John Baguinaon Eviota.
			</AlertDialog.Description>
		</AlertDialog.Header>

		<form method="POST" use:enhance class="flex flex-col gap-[0.625rem]">
			<Form.Field {form} name="status">
				<Form.Control let:attrs>
					<Form.Label>Status</Form.Label>
					<Select.Root
						selected={selectedStatus}
						onSelectedChange={(v) => {
							v && ($formData.status = v.value);
						}}
					>
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="Select status" />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="Approved" label="Approved" />
							<Select.Item value="Pending" label="Pending" />
							<Select.Item value="Declined" label="Declined" />
							<Select.Item value="Canceled" label="Canceled" />
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$formData.status} name={attrs.name} />
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<AlertDialog.Footer class="gap-[0.625rem] sm:gap-0">
				<Button
					variant="secondary"
					onclick={() => {
						updateSignal = false;
					}}
				>
					Cancel
				</Button>
				<Form.Button>Submit</Form.Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
