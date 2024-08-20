<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Button from '$lib/components/ui/button/button.svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { reservationSchema, type ReservationSchema } from './schema';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { Result } from '$lib/types';
	import CustomDate from '$lib/components/gen/CustomDate.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { fromUserState } from '../../_states/fromUserState.svelte';
	import { goto } from '$app/navigation';
	import { Loader } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	interface Props {
		reservationForm: SuperValidated<Infer<ReservationSchema>>;
	}

	const { reservationForm }: Props = $props();

	const user = fromUserState();

	const form = superForm(reservationForm, {
		validators: zodClient(reservationSchema),
		id: crypto.randomUUID(),
		onUpdate({ result }) {
			const { status, data } = result as Result<{ msg: string }>;

			switch (status) {
				case 200:
					toast.success('', { description: data.msg });
					open = false;
					break;
				case 401:
					toast.error('', { description: data.msg });
					break;
			}
		}
	});

	const { form: formData, enhance, submitting } = form;

	let open = $state(false);
</script>

<Button
	onclick={() => {
		if (user.getUser()) {
			open = true;
			return;
		}
		goto('/authenticate?error=you-must-be-logged-in');
	}}
>
	Reserve Now
</Button>
<AlertDialog.Root bind:open>
	<AlertDialog.Content class="flex max-h-screen max-w-[800px] flex-col gap-[1rem] p-0">
		<AlertDialog.Header class="p-[1rem] sm:px-[2rem] sm:pt-[2rem]">
			<AlertDialog.Title>Create Reservation</AlertDialog.Title>
			<AlertDialog.Description>
				You are creating reservation for <strong>Simbahang Banal</strong>
			</AlertDialog.Description>
		</AlertDialog.Header>

		<form
			method="POST"
			action="?/reservationEvent"
			use:enhance
			class="flex flex-col gap-[1rem] overflow-auto p-[1rem] sm:px-[2rem] sm:pt-0"
		>
			<Form.Field {form} name="eventName">
				<Form.Control let:attrs>
					<Form.Label>Event Name</Form.Label>
					<Input {...attrs} bind:value={$formData.eventName} placeholder="Enter event name" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<div class="grid gap-[1rem] md:grid-cols-2">
				<Form.Field {form} name="guestCount">
					<Form.Control let:attrs>
						<Form.Label>Number Of Guest</Form.Label>
						<Input
							type="number"
							{...attrs}
							bind:value={$formData.guestCount}
							placeholder="Enter number of guest"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="dateIn">
					<Form.Control let:attrs>
						<Form.Label>Enter Date In</Form.Label>
						<CustomDate {attrs} bind:dateValue={$formData.dateIn} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<div class="grid gap-[1rem] md:grid-cols-2">
				<Form.Field {form} name="initialTime">
					<Form.Control let:attrs>
						<Form.Label>Initial Time</Form.Label>
						<Input
							{...attrs}
							bind:value={$formData.initialTime}
							placeholder="Enter initial time example 07:30 AM"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="finalTime">
					<Form.Control let:attrs>
						<Form.Label>Final Time</Form.Label>
						<Input
							{...attrs}
							bind:value={$formData.finalTime}
							placeholder="Enter final time example 11:30 AM"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Form.Field {form} name="clientNote">
				<Form.Control let:attrs>
					<Form.Label>Note</Form.Label>
					<Textarea {...attrs} bind:value={$formData.clientNote} placeholder="Enter your note" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<AlertDialog.Footer class="flex flex-col gap-[1rem] sm:gap-0">
				<Form.Field {form} name="userObj">
					<Form.Control let:attrs>
						<Input
							{...attrs}
							value={JSON.stringify(user.getUser()?.user_metadata)}
							class="hidden"
						/>
					</Form.Control>
				</Form.Field>
				<Button
					variant="outline"
					onclick={() => {
						open = false;
						form.reset();
					}}>Cancel</Button
				>
				<Form.Button disabled={$submitting} class="relative">
					{#if $submitting}
						<div
							class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-sm bg-primary"
						>
							<Loader class="h-[15px] w-[15px] animate-spin" />
						</div>
					{/if}
					Submit Reservation
				</Form.Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
