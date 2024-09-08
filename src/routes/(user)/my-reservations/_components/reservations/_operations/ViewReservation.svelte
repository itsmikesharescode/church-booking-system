<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { BookOpenCheck, X } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Book2User } from '$lib/types';
	import { convertTo12HourFormat } from '$lib';

	interface Props {
		book: Book2User;
		status: string;
	}

	const { ...props }: Props = $props();

	let open = $state(false);
</script>

<Button
	onclick={() => (open = true)}
	size="sm"
	class="flex max-w-[150px] items-center gap-[0.313rem]"
>
	<BookOpenCheck class="h-[15px] w-[15px]" />
	View Details
</Button>

<AlertDialog.Root bind:open>
	<AlertDialog.Content class="flex max-h-screen max-w-[800px] flex-col gap-[1rem]">
		<button
			onclick={() => (open = false)}
			class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
		>
			<X class="h-4 w-4" />
			<span class="sr-only">Close</span>
		</button>
		<AlertDialog.Header>
			<AlertDialog.Title>Reservation Details</AlertDialog.Title>
		</AlertDialog.Header>

		<div class="flex flex-col gap-[0.625rem]">
			<p class="text-lg font-semibold">Client Details</p>

			<p class="text-sm leading-7 md:text-base">
				<strong>Full name:</strong>
				{props.book.user_list_tb.user_meta_data.lastName}, {props.book.user_list_tb.user_meta_data
					.firstName}
				{props.book.user_list_tb.user_meta_data.middleName}
			</p>

			<p class="text-sm leading-7 md:text-base">
				<strong>Mobile Number:</strong>
				{props.book.user_list_tb.user_meta_data.mobileNum}
			</p>

			<p class="text-sm leading-7 md:text-base">
				<strong>Email:</strong> eviotamikejohnb@gmail.com
			</p>
		</div>

		<div class="flex flex-col gap-[0.625rem] overflow-auto">
			<p class="text-lg font-semibold">Event Details</p>
			<p class="text-sm leading-7 md:text-base">
				<strong>Status:</strong>
				{props.status}
			</p>
			<!-- <p class="text-sm leading-7 md:text-base">
				<strong>Reference Number:</strong> WD-000002
			</p> -->
			<p class="text-sm leading-7 md:text-base">
				<strong>Event Name:</strong>
				{props.book.event_name}
			</p>

			<p class="text-sm leading-7 md:text-base">
				<strong>Date and Time:</strong>
				{props.book.date}
				{convertTo12HourFormat(props.book.initial_time)} - {convertTo12HourFormat(
					props.book.final_time
				)}
			</p>

			<p class="text-sm leading-7 md:text-base">
				<strong>Number of Guests:</strong>
				{props.book.number_guest}
			</p>

			<div class="">
				<p class="text-sm font-semibold leading-7 md:text-base">Notes:</p>

				<pre class="text-wrap font-sans text-sm leading-7 md:text-base">{props.book
						.number_guest}</pre>
			</div>
		</div>
	</AlertDialog.Content>
</AlertDialog.Root>
