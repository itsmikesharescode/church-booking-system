<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Select from '$lib/components/ui/select/index.js';
	import type { Result } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { Loader } from 'lucide-svelte';
	import { updatePwdSchema, type UpdatePwdSchema } from '../profile-schema';
	import CustomCalendar from '$lib/components/gen/CustomCalendar.svelte';

	interface Props {
		updatePwdForm: SuperValidated<Infer<UpdatePwdSchema>>;
	}

	const { updatePwdForm }: Props = $props();

	const form = superForm(updatePwdForm, {
		validators: zodClient(updatePwdSchema),
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
</script>

<div class="mx-auto flex max-w-[700px] flex-col justify-center p-[1rem]">
	<div class="">
		<form method="POST" action="?/signInEvent" use:enhance class="flex flex-col gap-[1rem]">
			<p class="text-xl font-semibold">Security Information</p>
			<div class="grid gap-[1rem] md:grid-cols-2">
				<Form.Field {form} name="pwd">
					<Form.Control let:attrs>
						<Form.Label>New Password</Form.Label>
						<Input
							type="password"
							{...attrs}
							bind:value={$formData.pwd}
							placeholder="Enter your new password"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="confirmPwd">
					<Form.Control let:attrs>
						<Form.Label>Confirm New Password</Form.Label>
						<Input
							type="password"
							{...attrs}
							bind:value={$formData.confirmPwd}
							placeholder="Confirm your new password"
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
						Update Password
					</Form.Button>
				</div>
			</div>
		</form>
	</div>
</div>
