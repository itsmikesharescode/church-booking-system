<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { BookOpenCheck, X } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';

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
				<strong>Full name:</strong> Eviota Mike John Baguinaon
			</p>

			<p class="text-sm leading-7 md:text-base">
				<strong>Mobile Number:</strong> 09123456789
			</p>

			<p class="text-sm leading-7 md:text-base">
				<strong>Email:</strong> eviotamikejohnb@gmail.com
			</p>
		</div>

		<div class="flex flex-col gap-[0.625rem] overflow-auto">
			<p class="text-lg font-semibold">Event Details</p>
			<p class="text-sm leading-7 md:text-base">
				<strong>Status:</strong> Reserved
			</p>
			<p class="text-sm leading-7 md:text-base">
				<strong>Reference Number:</strong> WD-000002
			</p>
			<p class="text-sm leading-7 md:text-base">
				<strong>Event Name:</strong> Wedding
			</p>

			<p class="text-sm leading-7 md:text-base">
				<strong>Date and Time:</strong> Mar 18, 2024 10:00 AM - 12:00 PM
			</p>

			<p class="text-sm leading-7 md:text-base">
				<strong>Number of Guests:</strong> 75
			</p>

			<div class="">
				<p class="text-sm font-semibold leading-7 md:text-base">Notes:</p>

				<pre
					class="text-wrap font-sans text-sm leading-7 md:text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic, possimus deserunt dolorem dignissimos veritatis debitis minus eveniet, odit soluta quidem, incidunt aspernatur expedita voluptates. Doloremque mollitia quod incidunt vitae quam corrupti, facere culpa distinctio, earum repellat repellendus fugit error perspiciatis cupiditate magni quia laborum blanditiis aliquam, iste adipisci ex molestiae numquam voluptatem impedit! Magni ipsa blanditiis corrupti, sed modi minima minus nobis soluta non unde? Est provident, labore molestiae ipsam quidem necessitatibus nam inventore soluta! At, illum deserunt aspernatur magni enim omnis pariatur ratione ipsam. Iusto, obcaecati recusandae autem quasi soluta sit, qui doloremque alias molestiae unde amet quas dignissimos.</pre>
			</div>
		</div>
	</AlertDialog.Content>
</AlertDialog.Root>
