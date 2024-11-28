<script lang="ts">
  import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';
  import UpdateEmail from './_components/UpdateEmail.svelte';
  import UpdateInfo from './_components/UpdateInfo.svelte';
  import UpdatePwd from './_components/UpdatePwd.svelte';
  import UpUpProfile from './_components/UpUpProfile.svelte';

  const { data } = $props();

  const staticRoute = fromStaticRouteState();
  staticRoute.setRoute('/profile');
</script>

<div class="grid items-start pb-[5rem] lg:grid-cols-3 lg:pb-0">
  <div class="">
    <UpUpProfile upUpProfileForm={data.upUpProfileForm} />
    <UpdateInfo updateInfoForm={data.updateInfoForm} />
  </div>
  <UpdateEmail updateEmailForm={data.updateEmailForm} />
  <UpdatePwd updatePwdForm={data.updatePwdForm} />
</div>
