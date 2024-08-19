<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { signUpSchema, type SignUpSchema } from '../authenticate-schema';
	import * as Select from '$lib/components/ui/select/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import CustomCalendar from '$lib/components/gen/CustomCalendar.svelte';

	interface Props {
		signUpForm: SuperValidated<Infer<SignUpSchema>>;
	}

	const { signUpForm }: Props = $props();

	const form = superForm(signUpForm, {
		validators: zodClient(signUpSchema),
		id: crypto.randomUUID()
	});

	const { form: formData, enhance } = form;

	const selectedGender = $derived(
		$formData.gender ? { label: $formData.gender, value: $formData.gender } : undefined
	);
</script>

<div class="flex min-h-screen flex-col justify-center p-[1rem] sm:p-[2rem]">
	<div class="">
		<form method="POST" action="?/signUpEvent" use:enhance class="mx-auto flex flex-col gap-[1rem]">
			<div class="mx-auto">
				<p class="text-center text-6xl font-bold">Sign Up</p>
				<p class="text-center leading-7 text-muted-foreground">Sign up to church booking system</p>
			</div>

			<div class="grid gap-[1rem] md:grid-cols-2">
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

			<div class="flex items-center justify-center">
				<div class="w-full max-w-[450px]">
					<div class="flex flex-col gap-[1rem]">
						<Form.Button>Create Account</Form.Button>

						<div class="flex items-center gap-[0.625rem]">
							<div class="h-[1px] w-full bg-slate-400"></div>
							<span>Or</span>
							<div class="h-[1px] w-full bg-slate-400"></div>
						</div>

						<Button variant="secondary" href="/authenticate">Sign In Here</Button>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
