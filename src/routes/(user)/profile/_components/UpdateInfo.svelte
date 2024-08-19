<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Select from '$lib/components/ui/select/index.js';
	import type { Result } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { Loader } from 'lucide-svelte';
	import { updateInfoSchema, type UpdateInfoShema } from '../profile-schema';
	import CustomCalendar from '$lib/components/gen/CustomCalendar.svelte';

	interface Props {
		updateInfoForm: SuperValidated<Infer<UpdateInfoShema>>;
	}

	const { updateInfoForm }: Props = $props();

	const form = superForm(updateInfoForm, {
		validators: zodClient(updateInfoSchema),
		id: crypto.randomUUID(),
		onUpdate({ result }) {
			const { status, data } = result as Result<{ msg: string }>;

			switch (status) {
				case 200:
					toast.success('', { description: data.msg });
					break;

				case 401:
					toast.error('', { description: data.msg });
					break;
			}
		}
	});

	const { form: formData, enhance, submitting } = form;

	const selectedGender = $derived(
		$formData.gender ? { label: $formData.gender, value: $formData.gender } : undefined
	);
</script>

<div class="mx-auto flex max-w-[700px] flex-col justify-center p-[1rem]">
	<div class="">
		<form method="POST" action="?/signInEvent" use:enhance class="flex flex-col gap-[1rem]">
			<p class="text-xl font-semibold">Personal Information</p>
			<div class="grid gap-[1rem] md:grid-cols-2">
				<Form.Field {form} name="firstName">
					<Form.Control let:attrs>
						<Form.Label>First Name</Form.Label>
						<Input
							{...attrs}
							bind:value={$formData.firstName}
							placeholder="Enter your new first name"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="middleName">
					<Form.Control let:attrs>
						<Form.Label>Middle Name</Form.Label>
						<Input
							{...attrs}
							bind:value={$formData.middleName}
							placeholder="Enter your new middle name"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="lastName">
					<Form.Control let:attrs>
						<Form.Label>Last Name</Form.Label>
						<Input
							{...attrs}
							bind:value={$formData.lastName}
							placeholder="Enter your new last name"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="birthDate">
					<Form.Control let:attrs>
						<Form.Label>Birth Date</Form.Label>
						<CustomCalendar {attrs} bind:dateValue={$formData.birthDate} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="gender">
					<Form.Control let:attrs>
						<Form.Label>Gender</Form.Label>
						<Select.Root
							selected={selectedGender}
							onSelectedChange={(v) => {
								v && ($formData.gender = v.value);
							}}
						>
							<Select.Trigger {...attrs}>
								<Select.Value placeholder="Select a new gender" />
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="Male" label="Male" />
								<Select.Item value="Female" label="Female" />
							</Select.Content>
						</Select.Root>
						<input hidden bind:value={$formData.gender} name={attrs.name} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="mobileNum">
					<Form.Control let:attrs>
						<Form.Label>Mobile Number</Form.Label>
						<Input
							{...attrs}
							bind:value={$formData.mobileNum}
							placeholder="Enter your new mobile number"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<div class="flex items-center justify-center">
				<div class="w-full max-w-[450px]">
					<Form.Button disabled={$submitting} class="relative w-full">
						{#if $submitting}
							<div
								class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-sm bg-primary"
							>
								<Loader class="h-[15px] w-[15px] animate-spin" />
							</div>
						{/if}
						Update Information
					</Form.Button>
				</div>
			</div>
		</form>
	</div>
</div>
