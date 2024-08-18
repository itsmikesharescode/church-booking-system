<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { signUpSchema, type SignUpSchema } from '../authenticate-schema';
	import Separator from '$lib/components/ui/separator/separator.svelte';
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
</script>

<div class="flex min-h-screen flex-col justify-center p-[1rem]">
	<div class="">
		<form method="POST" use:enhance class="mx-auto flex flex-col gap-[1rem]">
			<div class="mx-auto">
				<p class="text-center text-6xl font-bold">Sign Up</p>
				<p class="text-center leading-7 text-muted-foreground">Sign up to church booking system</p>
			</div>
			<div class="">
				<div class="grid grid-cols-2 gap-[1rem]">
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
				</div>
			</div>

			<div class="">
				<div class="grid grid-cols-2 gap-[1rem]">
					<Form.Field {form} name="lastName">
						<Form.Control let:attrs>
							<Form.Label>Last Name</Form.Label>
							<Input
								{...attrs}
								bind:value={$formData.lastName}
								placeholder="Enter your last name"
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
				</div>
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
