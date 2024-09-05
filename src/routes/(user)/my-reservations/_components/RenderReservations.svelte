<script lang="ts">
	import { getBookingStatus } from '$lib';
	import type { Book2User } from '$lib/types';
	import ViewReservation from './_operations/ViewReservation.svelte';

	interface Props {
		bookings: Book2User[] | null;
	}

	const { ...props }: Props = $props();
</script>

<div class="flex flex-col">
	<div
		class="sticky top-[4.8rem] hidden bg-secondary p-[1rem] text-sm font-semibold sm:grid sm:grid-cols-[50%,30%,20%] md:grid-cols-[40%,30%,15%,15%]"
	>
		<p>CLIENT NAME</p>
		<p class="hidden md:block">EVENT NAME</p>
		<p>STATUS</p>
	</div>

	<div class="">
		{#each props.bookings ?? [] as book}
			<div
				class="grid border-b-[1px] p-[1rem] text-sm sm:grid-cols-[50%,30%,20%] md:grid-cols-[40%,30%,15%,15%]"
			>
				<p class="flex items-center">
					{book.user_list_tb.user_meta_data.lastName}, {book.user_list_tb.user_meta_data.firstName}
					{book.user_list_tb.user_meta_data.middleName}
				</p>
				<p class="hidden items-center md:flex">{book.event_name}</p>
				<p class="flex items-center">
					{getBookingStatus(`${book.date}/${book.initial_time}/${book.final_time}`)}
				</p>
				<div class="flex items-center justify-end p-2">
					<ViewReservation
						{book}
						status={getBookingStatus(`${book.date}/${book.initial_time}/${book.final_time}`)}
					/>
				</div>
			</div>
		{/each}
	</div>
</div>
