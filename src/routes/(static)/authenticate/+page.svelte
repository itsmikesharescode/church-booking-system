<script lang="ts">
	import { page } from '$app/stores';
	import bg_photo from '$lib/assets/bg_landing.jpg?enhanced';
</script>

<div class="grid h-screen grid-cols-[40%,1fr]">
	<div class="">
		<enhanced:img src={bg_photo} alt="" class="h-full w-full"></enhanced:img>
	</div>

	<div class="">
		{#if $page.url.searchParams.get('q') === 'sign-up'}{:else if $page.url.searchParams.get('q') === 'forgot-password'}{:else}{/if}
	</div>
</div>
