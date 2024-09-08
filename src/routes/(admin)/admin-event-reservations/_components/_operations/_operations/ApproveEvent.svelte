<script lang="ts">
	import { enhance } from '$app/forms';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { BookJoinUser, Result } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Loader } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	interface Props {
		approveSignal: boolean;
		booking: BookJoinUser;
	}

	let { approveSignal = $bindable(), ...props }: Props = $props();

	let approveLoader = $state(false);

	const approveBookingEvent: SubmitFunction = () => {
		approveLoader = true;
		return async ({ result, update }) => {
			const { status, data } = result as Result<{ msg: string }>;

			switch (status) {
				case 200:
					toast.success('', { description: data.msg });
					approveSignal = false;
					break;

				case 401:
					toast.error('', { description: data.msg });
					break;
			}
			await update();
			approveLoader = false;
		};
	};
</script>

<AlertDialog.Root bind:open={approveSignal}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer class="gap-[0.625rem] sm:gap-0">
			<Button
				variant="secondary"
				onclick={() => {
					approveSignal = false;
				}}
			>
				Cancel
			</Button>
			<form method="post" action="?/approveBookingEvent" use:enhance={approveBookingEvent}>
				<input name="bookingId" type="hidden" value={props.booking.id} />
				<Button disabled={approveLoader} type="submit" class="relative">
					{#if approveLoader}
						<div
							class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-sm bg-primary"
						>
							<Loader class="h-[15px] w-[15px] animate-spin" />
						</div>
					{/if}
					Approve
				</Button>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
