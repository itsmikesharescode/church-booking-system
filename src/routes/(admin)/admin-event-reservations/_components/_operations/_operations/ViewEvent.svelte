<script lang="ts">
	import { convertTo12HourFormat, getBookingStatus } from '$lib';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import type { BookJoinUser } from '$lib/types';
	import { X } from 'lucide-svelte';

	interface Props {
		viewSignal: boolean;
		booking: BookJoinUser;
	}

	let { viewSignal = $bindable(), ...props }: Props = $props();
</script>

<AlertDialog.Root bind:open={viewSignal}>
	<AlertDialog.Content class="flex max-h-screen max-w-[1200px] flex-col gap-[1rem]">
		<button
			onclick={() => {
				viewSignal = false;
			}}
			class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
		>
			<X />
			<span class="sr-only">Close</span>
		</button>

		<AlertDialog.Header>
			<AlertDialog.Title>Viewing Details</AlertDialog.Title>
		</AlertDialog.Header>

		<div class="flex flex-col gap-[0.625rem] overflow-auto px-[1rem]">
			<div class="flex flex-col gap-[0.625rem]">
				<AlertDialog.Header>
					<AlertDialog.Title>Client Details</AlertDialog.Title>
				</AlertDialog.Header>

				<div class="grid gap-[0.625rem] lg:grid-cols-3">
					<div class="">
						<span class="font-semibold">First Name:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">
							{props.booking.user_meta_data.firstName}
						</p>
					</div>

					<div class="">
						<span class="font-semibold">Middle Name:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">
							{props.booking.user_meta_data.middleName}
						</p>
					</div>

					<div class="">
						<span class="font-semibold">Last Name:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">
							{props.booking.user_meta_data.lastName}
						</p>
					</div>
				</div>

				<div class="grid gap-[0.625rem] lg:grid-cols-3">
					<div class="">
						<span class="font-semibold">Gender:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">
							{props.booking.user_meta_data.gender}
						</p>
					</div>

					<div class="">
						<span class="font-semibold">Birth Date:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">
							{props.booking.user_meta_data.birthDate}
						</p>
					</div>

					<div class="">
						<span class="font-semibold">Mobile Number:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">
							{props.booking.user_meta_data.mobileNum}
						</p>
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-[0.625rem]">
				<AlertDialog.Header>
					<AlertDialog.Title>Event Details</AlertDialog.Title>
				</AlertDialog.Header>

				<div class="grid gap-[0.625rem] lg:grid-cols-2">
					<div class="">
						<span class="font-semibold">Status:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">
							{getBookingStatus(
								`${props.booking.date}/${props.booking.initial_time}/${props.booking.final_time}`
							)}
						</p>
					</div>
				</div>

				<div class="grid gap-[0.625rem] lg:grid-cols-3">
					<div class="">
						<span class="font-semibold">Event Name:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">{props.booking.event_name}</p>
					</div>

					<div class="">
						<span class="font-semibold">No Of Guest:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">{props.booking.number_guest}</p>
					</div>

					<div class="">
						<span class="font-semibold">Date and Time:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">
							{props.booking.date}
							{convertTo12HourFormat(props.booking.initial_time)} - {convertTo12HourFormat(
								props.booking.final_time
							)}
						</p>
					</div>
				</div>

				<div class="">
					<span class="font-semibold">Note:</span>
					<pre class="text-wrap rounded-lg border-[1px] p-[0.625rem] font-sans">{props.booking
							.event_note}</pre>
				</div>
			</div>
		</div>
	</AlertDialog.Content>
</AlertDialog.Root>
