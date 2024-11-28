<script lang="ts">
  import { enhance } from '$app/forms';
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { ChurchType, Result } from '$lib/types';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Loader } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';
  import { useTableState } from '../table/tableState.svelte';

  const tableState = useTableState();

  let deleteLoader = $state(false);
  const deleteChEvent: SubmitFunction = () => {
    deleteLoader = true;
    return async ({ result, update }) => {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success(data.msg);
          tableState.setShowDelete(false);
          tableState.setActiveRow(null);
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

<AlertDialog.Root open={tableState.getShowDelete()}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete <strong
          >{tableState.getActiveRow()?.name}</strong
        > and remove data from our database.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer class=" gap-[0.625rem] sm:gap-0">
      <Button
        onclick={() => {
          tableState.setShowDelete(false);
          tableState.setActiveRow(null);
        }}
        variant="secondary"
      >
        Cancel
      </Button>
      <form method="post" action="?/deleteChEvent" use:enhance={deleteChEvent}>
        <input name="chId" type="hidden" value={tableState.getActiveRow()?.id} />
        <input name="chPhotoPath" type="hidden" value={tableState.getActiveRow()?.photo_path} />
        <Button type="submit" disabled={deleteLoader} class="relative w-full">
          {#if deleteLoader}
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-sm bg-primary"
            >
              <Loader class="h-[15px] w-[15px] animate-spin" />
            </div>
          {/if}

          Delete
        </Button>
      </form>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
