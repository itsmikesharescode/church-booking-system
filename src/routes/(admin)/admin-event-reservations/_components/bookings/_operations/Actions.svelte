<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { Logs } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import AdminViewEvent from './_operations/AdminViewEvent.svelte';
  import AdminDeleteEvent from './_operations/AdminDeleteEvent.svelte';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import AdminApproveEvent from './_operations/AdminApproveEvent.svelte';
  import type { AdminQType } from '$lib/types';
  import type { ApproveSchema } from './_operations/event-schema';

  interface Props {
    approveForm: SuperValidated<Infer<ApproveSchema>>;
    booking: AdminQType['bookings'][number];
  }

  const { ...props }: Props = $props();

  let open = $state(false);
  let viewSignal = $state(false);
  let updateSignal = $state(false);
  let deleteSignal = $state(false);
  let approveSignal = $state(false);
</script>

<DropdownMenu.Root bind:open>
  <DropdownMenu.Trigger>
    <Button size="sm" variant="secondary"><Logs class="h-[15px] w-[15px]" /></Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Item
        class="flex items-center justify-center"
        onclick={() => {
          approveSignal = true;
        }}
      >
        Approve
      </DropdownMenu.Item>
      <DropdownMenu.Item
        class="flex items-center justify-center"
        onclick={() => {
          viewSignal = true;
        }}
      >
        View Event
      </DropdownMenu.Item>
      <!-- <DropdownMenu.Item
				class="flex items-center justify-center"
				onclick={() => {
					updateSignal = true;
				}}
			>
				Update Status
			</DropdownMenu.Item> -->

      <DropdownMenu.Item
        class="flex items-center justify-center"
        onclick={() => {
          deleteSignal = true;
        }}
      >
        Delete Event
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<AdminApproveEvent bind:approveSignal booking={props.booking} approveForm={props.approveForm} />
<AdminViewEvent bind:viewSignal booking={props.booking} />
<AdminDeleteEvent bind:deleteSignal booking={props.booking} />
