<script lang="ts">
	import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';

	const staticRoute = fromStaticRouteState();
	staticRoute.setRoute('/profile');
</script>

<div class=""></div>
