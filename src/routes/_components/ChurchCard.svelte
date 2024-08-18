<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { mockChuchDatas } from '$lib';
	import Button from '$lib/components/ui/button/button.svelte';
	import Autoplay from 'embla-carousel-autoplay';

	const randomSeconds = () => {
		const randomNumber = Math.floor(Math.random() * 3);
		return (randomNumber + 2) * 1000;
	};
</script>

<div class="">
	<div class="">
		<p class="text-3xl font-semibold">Simbahang Banal</p>
		<p class="leading-7 text-muted-foreground md:text-xl">
			A nurturing spiritual home dedicated to cultivating a deep relationship with God and
			empowering individuals to reach their full potential.
		</p>
	</div>
	<Carousel.Root
		plugins={[
			Autoplay({
				delay: randomSeconds()
			})
		]}
		class="flex flex-col gap-[1rem] p-[1rem]"
	>
		<Carousel.Content>
			{#each mockChuchDatas as mockData, i (i)}
				<Carousel.Item>
					<div class="grid md:grid-cols-2">
						<img src={mockData.img} alt="" class="h-[300px] w-full" />
						<div class="flex h-[300px] flex-col gap-[1rem] overflow-auto bg-secondary p-[1rem]">
							<p class="text-4xl font-semibold">{mockData.title}</p>
							<pre
								class="text-wrap font-sans leading-7 text-muted-foreground">{mockData.description}</pre>
						</div>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>

		<div class="flex justify-end">
			<Button>Reserve Now</Button>
		</div>
	</Carousel.Root>
</div>
