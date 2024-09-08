<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { BookOpenCheck, X } from 'lucide-svelte';
	import type { ChurchType, UserQType } from '$lib/types';
	import { convertTo12HourFormat } from '$lib';
	import { fromSupabaseState } from '../../../../../_states/fromSupabaseState.svelte';
	import { onMount } from 'svelte';
	import type { PostgrestSingleResponse } from '@supabase/supabase-js';

	interface Props {
		payment: UserQType['payments'][number];
		viewSignal: boolean;
	}

	let { viewSignal = $bindable(), ...props }: Props = $props();

	/* const supabase = fromSupabaseState();

	const getPaymentDetails = async () => {
		const sb = supabase.get();
		if (!sb) return;

		const { data, error } = (await sb
			.from('church_list_tb')
			.select('*')
			.eq('id', props.payment.church_id)
			.single()) as PostgrestSingleResponse<ChurchType>;
	};

	$effect(() => {
		if (viewSignal) {
			getPaymentDetails();
		}
	}); */
</script>

<AlertDialog.Root bind:open={viewSignal}>
	<AlertDialog.Content class="flex max-h-screen max-w-[800px] flex-col gap-[1rem]">
		<button
			onclick={() => {
				viewSignal = false;
			}}
			class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
		>
			<X class="h-4 w-4" />
			<span class="sr-only">Close</span>
		</button>
		<AlertDialog.Header>
			<AlertDialog.Title>Payment Details</AlertDialog.Title>
		</AlertDialog.Header>
	</AlertDialog.Content>
</AlertDialog.Root>
