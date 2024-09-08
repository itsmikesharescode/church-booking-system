<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import Actions from './Actions.svelte';
	import { fromDashBRouteState } from '../../_states/fromDashboard.svelte';
	import { convertTo12HourFormat, publicAPIs } from '$lib';
	import * as Avatar from '$lib/components/ui/avatar';
	import type { UpdateChInfoSchema, UpdateChPhotoSchema } from '../admin-dashboard-schema';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';

	interface Props {
		updateChInfoForm: SuperValidated<Infer<UpdateChInfoSchema>>;
		updateChPhotoForm: SuperValidated<Infer<UpdateChPhotoSchema>>;
	}

	const { ...props }: Props = $props();

	const dashboardRoute = fromDashBRouteState();
</script>

{#if dashboardRoute.getChurches()?.length}
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[50px]"></Table.Head>
				<Table.Head class="truncate">CHURCH NAME</Table.Head>
				<Table.Head class="truncate">OPENING HOURS</Table.Head>
				<Table.Head class="truncate">Description</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each dashboardRoute.getChurches() ?? [] as church (church)}
				<Table.Row>
					<Table.Cell class="">
						<Actions
							{church}
							updateChInfoForm={props.updateChInfoForm}
							updateChPhotoForm={props.updateChPhotoForm}
						/>
					</Table.Cell>
					<Table.Cell class="truncate font-medium">
						<div class="flex items-center gap-[0.625rem]">
							<Avatar.Root>
								<Avatar.Image src={publicAPIs(church.photo_path, 'Church')} alt="churchPhoto" />
								<Avatar.Fallback>{church.name[0].toLocaleUpperCase()}</Avatar.Fallback>
							</Avatar.Root>
							{church.name}
						</div>
					</Table.Cell>
					<Table.Cell class="truncate"
						>{convertTo12HourFormat(church.open_time)} -
						{convertTo12HourFormat(church.close_time)}
					</Table.Cell>
					<Table.Cell class="">{church.description}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{:else}
	<p class="mt-[1rem] text-center text-muted-foreground">No Records</p>
{/if}
