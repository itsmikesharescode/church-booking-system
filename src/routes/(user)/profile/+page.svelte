<script lang="ts">
	import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';
	import UpdateInfo from './_components/UpdateInfo.svelte';
	import UpUpProfile from './_components/UpUpProfile.svelte';

	const { data } = $props();

	const staticRoute = fromStaticRouteState();
	staticRoute.setRoute('/profile');
</script>

<div class="p-[1rem] sm:p-[2rem]">
	<UpUpProfile upUpProfileForm={data.upUpProfileForm} />
	<UpdateInfo updateInfoForm={data.updateInfoForm} />
</div>
