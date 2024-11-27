<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import FileCheck from 'lucide-svelte/icons/file-check';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import type { Row } from '@tanstack/table-core';
  import { type PaymentsPageTable } from '../data/schemas';
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import Button from '$lib/components/ui/button/button.svelte';
  import Loader from 'lucide-svelte/icons/loader';

  let { row }: { row: Row<PaymentsPageTable> } = $props();

  let open = $state(false);

  let deleteLoader = $state(false);
  const deleteReservationEvent: SubmitFunction = () => {
    deleteLoader = true;
    return async ({ result, update }) => {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success(data.msg);
          open = false;
          break;

        case 401:
          toast.error(data.msg);
          break;
      }
      await update();
      deleteLoader = false;
    };
  };
</script>

<AlertDialog.Root bind:open>
  <AlertDialog.Trigger class=" group h-full rounded-full p-2 transition-all hover:bg-primary">
    <FileCheck class="h-4 w-4 group-hover:text-secondary" />
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your reservation
        <strong>asdasd</strong> from our database.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>

      <form method="post" action="?/deleteReservationEvent" use:enhance={deleteReservationEvent}>
        <input name="bookingId" type="hidden" value={row.original.id} />
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
