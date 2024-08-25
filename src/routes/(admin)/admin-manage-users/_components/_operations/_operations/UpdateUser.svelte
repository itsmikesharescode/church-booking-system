<script lang="ts">
	import CustomCalendar from '$lib/components/gen/CustomCalendar.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import type { Result, UserType } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Select from '$lib/components/ui/select/index.js';
	import { updateUserSchema, type UpdateUserSchema } from '../../../manage-users-schema';
	import { Loader } from 'lucide-svelte';
	import { fromManageUsersRoute } from '../../../../_states/fromManageUsers.svelte';

	interface Props {
		updateSignal: boolean;
		updateUserForm: SuperValidated<Infer<UpdateUserSchema>>;
		userProp: UserType;
	}

	let { updateSignal = $bindable(), updateUserForm, userProp }: Props = $props();

	const manageUsersRoute = fromManageUsersRoute();

	const form = superForm(updateUserForm, {
		validators: zodClient(updateUserSchema),
		id: crypto.randomUUID(),
		invalidateAll: false,
		onUpdate({ result }) {
			const { status, data } = result as Result<{ msg: string; data: UserType[] }>;
			switch (status) {
				case 200:
					toast.success('', { description: data.msg });
					manageUsersRoute.setUsers(data.data);
					form.reset();
					updateSignal = false;
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

<AlertDialog.Root bind:open={updateSignal}>
	<AlertDialog.Content class="flex max-h-screen max-w-[800px] flex-col gap-[0.625rem] p-0">
		<AlertDialog.Header class="p-[1rem] sm:p-[2rem]">
			<AlertDialog.Title>Update User Details</AlertDialog.Title>
			<AlertDialog.Description>Answer the fields to update</AlertDialog.Description>
		</AlertDialog.Header>

		<form
			method="POST"
			action="?/updateUserEvent"
			use:enhance
			class="flex flex-col gap-[1rem] overflow-auto px-[1rem] sm:px-[2rem]"
		>
			<div class="grid gap-[1rem] md:grid-cols-2">
				<Form.Field {form} name="userId" class="hidden">
					<Form.Control let:attrs>
						<Input {...attrs} bind:value={userProp.user_id} />
					</Form.Control>
				</Form.Field>

				<Form.Field {form} name="firstName">
					<Form.Control let:attrs>
						<Form.Label>First Name</Form.Label>
						<Input
							{...attrs}
							bind:value={$formData.firstName}
							placeholder="Enter your first name"
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
							placeholder="Enter your middle name"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="lastName">
					<Form.Control let:attrs>
						<Form.Label>Last Name</Form.Label>
						<Input {...attrs} bind:value={$formData.lastName} placeholder="Enter your last name" />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="birthDate">
					<Form.Control let:attrs>
						<Form.Label>Birth Date</Form.Label>
						<CustomCalendar
							title="Select your birth date"
							{attrs}
							bind:dateValue={$formData.birthDate}
						/>
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
								<Select.Value placeholder="Select a gender" />
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
							placeholder="Enter your mobile number"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="email">
					<Form.Control let:attrs>
						<Form.Label>Email</Form.Label>
						<Input {...attrs} bind:value={$formData.email} placeholder="Enter your email" />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="pwd">
					<Form.Control let:attrs>
						<Form.Label>Password</Form.Label>
						<Input
							type="password"
							{...attrs}
							bind:value={$formData.pwd}
							placeholder="Enter your password"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="confirmPwd">
					<Form.Control let:attrs>
						<Form.Label>Confirm Password</Form.Label>
						<Input
							type="password"
							{...attrs}
							bind:value={$formData.confirmPwd}
							placeholder="Confirm your password"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<AlertDialog.Footer class="gap-[0.625rem] pb-[1rem] sm:gap-0 sm:pb-[2rem]">
				<Button
					variant="secondary"
					onclick={() => {
						updateSignal = false;
						form.reset();
					}}
				>
					Cancel
				</Button>
				<Form.Button disabled={$submitting} class="relative">
					{#if $submitting}
						<div
							class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-sm bg-primary"
						>
							<Loader class="h-[15px] w-[15px] animate-spin" />
						</div>
					{/if}
					Update
				</Form.Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
