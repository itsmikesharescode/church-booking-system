<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { X } from 'lucide-svelte';

	interface Props {
		viewSignal: boolean;
	}

	let { viewSignal = $bindable() }: Props = $props();
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
						<p class="rounded-lg border-[1px] p-[0.625rem]">Mike John</p>
					</div>

					<div class="">
						<span class="font-semibold">Middle Name:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">Baguinaon</p>
					</div>

					<div class="">
						<span class="font-semibold">Last Name:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">Eviota</p>
					</div>
				</div>

				<div class="grid gap-[0.625rem] lg:grid-cols-3">
					<div class="">
						<span class="font-semibold">Gender:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">Male</p>
					</div>

					<div class="">
						<span class="font-semibold">Birth Date:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">Nov 6 1962</p>
					</div>

					<div class="">
						<span class="font-semibold">Mobile Number:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">09123456789</p>
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-[0.625rem]">
				<AlertDialog.Header>
					<AlertDialog.Title>Event Details</AlertDialog.Title>
				</AlertDialog.Header>

				<div class="grid gap-[0.625rem] lg:grid-cols-2">
					<div class="">
						<span class="font-semibold">Reference No:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">WD-000002</p>
					</div>

					<div class="">
						<span class="font-semibold">Status:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">Approved</p>
					</div>
				</div>

				<div class="grid gap-[0.625rem] lg:grid-cols-3">
					<div class="">
						<span class="font-semibold">Event Name:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">Wedding</p>
					</div>

					<div class="">
						<span class="font-semibold">No Of Guest:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">100</p>
					</div>

					<div class="">
						<span class="font-semibold">Date and Time:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">Mar 18, 2024 10:00 AM - 12:00 PM</p>
					</div>
				</div>

				<div class="grid gap-[0.625rem] lg:grid-cols-3">
					<div class="">
						<span class="font-semibold">Gender:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">Male</p>
					</div>

					<div class="">
						<span class="font-semibold">Birth Date:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">Nov 6 1962</p>
					</div>

					<div class="">
						<span class="font-semibold">Mobile Number:</span>
						<p class="rounded-lg border-[1px] p-[0.625rem]">09123456789</p>
					</div>
				</div>

				<div class="">
					<span class="font-semibold">Note:</span>
					<pre
						class="text-wrap rounded-lg border-[1px] p-[0.625rem] font-sans">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse et neque eveniet tenetur possimus, blanditiis sapiente ipsum nostrum officiis error rem reiciendis optio hic illum repellendus laboriosam provident commodi. Tempore molestias perspiciatis, ipsam esse fugit consequatur dolorum quasi blanditiis enim voluptas soluta laboriosam repudiandae numquam a autem incidunt deleniti, maxime sapiente aliquam consequuntur magni inventore tempora qui! Quia ut, tenetur fugiat nisi optio odio quaerat inventore quos eius deleniti perspiciatis quae quam. Amet nihil mollitia modi quos, adipisci iusto doloremque distinctio hic similique, fugiat laudantium. Optio libero, fuga laborum obcaecati facilis quis sit voluptatum nostrum provident minus quasi, veniam nemo distinctio sunt tempora autem temporibus, doloribus praesentium qui explicabo aperiam ullam laudantium eligendi! Doloribus, dolore sit unde mollitia ex officiis enim quis voluptas, blanditiis aut amet incidunt, adipisci illum non laborum nihil tempore tenetur consequuntur fuga corporis omnis veritatis culpa consectetur. Nostrum ad vel soluta commodi qui sed architecto, explicabo cumque iusto perferendis, velit doloribus dolor aspernatur amet? Blanditiis aliquid nobis reprehenderit commodi? Delectus consequatur ratione quos voluptatum quas est, repudiandae unde provident optio minus, corrupti sint, asperiores tempora vel suscipit ipsum quidem! Saepe repudiandae dolor quis atque autem non enim et nihil unde dolore harum voluptatibus iste aperiam amet, maiores officiis quaerat, inventore delectus rem, voluptates ab ipsum aspernatur ut sed. Voluptatum possimus minima, quo soluta illo ducimus dolor quia amet obcaecati illum perspiciatis nam commodi quis quae reiciendis architecto animi, molestiae magni, dolorem dignissimos odio unde. Vel, earum facere modi repellat quibusdam eligendi dolorem vitae quo numquam adipisci, quas saepe. Consectetur laboriosam architecto ullam et blanditiis voluptate, vitae ab error? Ipsum, nisi aperiam, saepe, iusto corrupti similique cumque illum architecto earum adipisci ut! Ad fugit fuga illo nobis obcaecati esse. Magni fuga facere voluptatem suscipit vero dolorum repudiandae? Sit magni praesentium exercitationem, soluta consectetur nostrum debitis ad suscipit.</pre>
				</div>
			</div>
		</div>
	</AlertDialog.Content>
</AlertDialog.Root>
