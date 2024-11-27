<script lang="ts">
  import { page } from '$app/stores';
  import bg_photo from '$lib/assets/bg_landing.jpg?enhanced';
  import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';
  import ForgotPwd from './_components/ForgotPwd.svelte';
  import SignIn from './_components/SignIn.svelte';
  import SignUp from './_components/SignUp.svelte';

  const staticRoute = fromStaticRouteState();
  staticRoute.setRoute('');

  const { data } = $props();
</script>

<div class="">
  <div class="">
    {#if $page.url.searchParams.get('q') === 'sign-up'}
      <SignUp signUpForm={data.signUpForm} />
    {:else if $page.url.searchParams.get('q') === 'forgot-password'}
      <ForgotPwd forgotPwdForm={data.forgotPwdForm} />
    {:else}
      <SignIn signInForm={data.signInForm} />
    {/if}
  </div>
</div>
