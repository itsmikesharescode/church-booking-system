<script lang="ts">
	import { page } from '$app/stores';
	import bg_photo from '$lib/assets/bg_landing.jpg?enhanced';
	import ForgotPwd from './_components/ForgotPwd.svelte';
	import SignIn from './_components/SignIn.svelte';
	import SignUp from './_components/SignUp.svelte';

	const { data } = $props();
</script>

<div class="grid h-screen md:grid-cols-[40%,1fr]">
	<div class="hidden md:block">
		<enhanced:img src={bg_photo} alt="" class="h-full w-full"></enhanced:img>
	</div>

	<div class="">
		{#if $page.url.searchParams.get('q') === 'sign-up'}
			<SignUp signUpForm={data.signUpForm} />
		{:else if $page.url.searchParams.get('q') === 'forgot-password'}
			<ForgotPwd />
		{:else}
			<SignIn signInForm={data.signInForm} />
		{/if}
	</div>
</div>
