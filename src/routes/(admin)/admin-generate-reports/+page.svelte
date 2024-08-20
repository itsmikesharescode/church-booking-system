<script lang="ts">
	import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';

	const staticRoute = fromStaticRouteState();

	staticRoute.setRoute('/admin-generate-reports');
</script>

<div class="">generate reports</div>
