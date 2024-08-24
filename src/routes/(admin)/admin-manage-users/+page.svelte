<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { MoveUpRight } from 'lucide-svelte';
	import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';
	import RenderUsers from './_components/RenderUsers.svelte';
	import Pagination from './_components/_operations/Pagination.svelte';
	import CreateUser from './_components/CreateUser.svelte';

	const { data } = $props();

	const staticRoute = fromStaticRouteState();

	staticRoute.setRoute('/admin-manage-users');
</script>

<div class="flex flex-col gap-[2rem] p-[1rem] sm:p-[2rem]">
	<section class="flex flex-col gap-[0.625rem]">
		<div class="flex flex-col items-center gap-[1rem] md:flex-row md:justify-between">
			<CreateUser createUserForm={data.createUserForm} />

			<div class="">
				<Pagination />
			</div>
		</div>
		<RenderUsers updateUserForm={data.updateUserForm} />
	</section>
</div>
