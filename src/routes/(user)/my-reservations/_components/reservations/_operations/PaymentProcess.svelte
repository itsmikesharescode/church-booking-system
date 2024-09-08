<script lang="ts">
	import { enhance } from '$app/forms';
	import type { UserQType } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Loader, MoveUpRight } from 'lucide-svelte';
	import type { CreateInvoiceRequest } from 'xendit-node/invoice/models';
	import { page } from '$app/stores';
	import { fromUserState } from '../../../../../_states/fromUserState.svelte';

	interface Props {
		reservation: UserQType['reservations'][number];
	}

	const { ...props }: Props = $props();

	const user = fromUserState();

	const paymentRequirements = () => {
		const userRef = user.getUser();

		if (!userRef) return;

		const invoice: CreateInvoiceRequest = {
			externalId: user.getUser()?.id ?? '',
			description: 'You are about to pay in food ordering system',
			amount: 0,
			currency: 'PHP',
			customer: {
				givenNames: userRef.user_metadata.firstName,
				surname: userRef.user_metadata.lastName,
				email: userRef.email,
				mobileNumber: userRef.user_metadata.mobileNum
			},
			customerNotificationPreference: {
				invoicePaid: ['email', 'whatsapp']
			},
			successRedirectUrl: `${$page.url.origin}/my-reservations`,
			failureRedirectUrl: 'example.com/failure',

			items: []
		};
	};

	let paymentLoader = $state(false);
	const paymentProcessEvent: SubmitFunction = () => {
		paymentLoader = true;
		return async ({ result, update }) => {
			const { status } = result;

			switch (status) {
				case 200:
					break;

				case 401:
					break;
			}
			await update();
			paymentLoader = false;
		};
	};
</script>

<form method="post" action="?/paymentProcessEvent" use:enhance={paymentProcessEvent}>
	<button
		disabled={paymentLoader}
		class="relative flex items-center gap-[0.5rem] bg-yellow-500 px-[0.5rem] font-semibold text-black transition-all hover:scale-105 active:scale-95"
	>
		{#if paymentLoader}
			<div
				class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center gap-[0.5rem] rounded-sm bg-yellow-500"
			>
				Forwarding...
				<Loader class="h-[15px] w-[15px] animate-spin" />
			</div>
		{/if}

		Proceed Payment
		<MoveUpRight class="h-[15px] w-[15px]" />
	</button>
</form>
