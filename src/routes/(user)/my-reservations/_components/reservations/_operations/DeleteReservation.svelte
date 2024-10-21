<script lang="ts">
  import { enhance } from '$app/forms';
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { Result, UserQType } from '$lib/types';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Loader } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';

  interface Props {
    deleteSignal: boolean;
    reservation: UserQType['reservations'][number];
  }

  let { deleteSignal = $bindable(), ...props }: Props = $props();

  let deleteLoader = $state(false);
  const deleteReservationEvent: SubmitFunction = () => {
    deleteLoader = true;
    return async ({ result, update }) => {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success('', { description: data.msg });
          deleteSignal = false;
          break;

        case 401:
          toast.error('', { description: data.msg });
          break;
      }
      await update();
      deleteLoader = false;
    };
  };
</script>

<AlertDialog.Root bind:open={deleteSignal}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your reservation
        <strong>{props.reservation.event_name}</strong> from our database.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>

      <form method="post" action="?/deleteReservationEvent" use:enhance={deleteReservationEvent}>
        <input name="bookingId" type="hidden" value={props.reservation.id} />
        <Button type="submit" disabled={deleteLoader} class="relative w-full">
          {#if deleteLoader}
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-sm bg-primary"
            >
              <Loader class="h-[15px] w-[15px] animate-spin" />
            </div>
          {/if}

          Proceed
        </Button>
      </form>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
