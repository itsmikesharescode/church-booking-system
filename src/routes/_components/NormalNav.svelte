<script lang="ts">
	import { AlignJustify } from 'lucide-svelte';
	import DarkMode from '$lib/components/gen/DarkMode.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { fromUserState } from '../_states/fromUserState.svelte';
	import { fromStaticRouteState } from '../_states/fromStaticRouteState.svelte';
	import Logout from './Logout.svelte';

	const user = fromUserState();
	const staticRoute = fromStaticRouteState();

	let mobileMenu = $state(false);
</script>

<nav class="sticky top-0 z-10 flex justify-between border-b-[1px] p-[1rem] backdrop-blur-lg">
	<div class="flex items-center gap-[0.625rem]">
		<div class="flex items-center gap-[0.625rem]">
			<DarkMode />
		</div>

		<div class="flex items-center gap-[0.625rem]">
			{#each staticRoute.getRoutes(user.getUser()) as route}
				<a href={route.url} class="p-[0.625rem]">{route.name}</a>
			{/each}
		</div>
	</div>

	<div class="hidden items-center gap-[0.625rem] md:flex">
		{#if user.getUser()}
			<Logout />
		{:else}
			<Button href="/authenticate">Sign In</Button>
			<Button href="/authenticate?q=sign-up">Sign Up Free</Button>
		{/if}
	</div>

	<button class="md:hidden" onclick={() => (mobileMenu = true)}>
		<AlignJustify />
	</button>
</nav>

<!--Mobile-->
<Sheet.Root bind:open={mobileMenu}>
	<Sheet.Content side="left" class="flex flex-col justify-center gap-[1rem]">
		<div class="flex flex-col gap-[1rem]">
			<p class="text-center font-bold">Church Booking System</p>
			<div class="flex flex-col gap-[1rem]">
				<Button href="/authenticate" onclick={() => (mobileMenu = false)}>Sign In</Button>
				<Button href="/authenticate?q=sign-up" onclick={() => (mobileMenu = false)}
					>Sign Up Free</Button
				>
			</div>
		</div>
	</Sheet.Content>
</Sheet.Root>
