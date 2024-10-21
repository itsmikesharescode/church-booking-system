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

<div class="p-[1rem] sm:p-[2rem]">
  <UpUpProfile upUpProfileForm={data.upUpProfileForm} />
  <UpdateInfo updateInfoForm={data.updateInfoForm} />
  <UpdateEmail updateEmailForm={data.updateEmailForm} />
  <UpdatePwd updatePwdForm={data.updatePwdForm} />
</div>
