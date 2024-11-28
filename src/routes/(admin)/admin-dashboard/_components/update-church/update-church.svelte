<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { useTableState } from '../table/tableState.svelte';
  import { type Infer, type SuperValidated } from 'sveltekit-superforms';
  import X from 'lucide-svelte/icons/x';
  import type { UpdateChurchInfoSchema, UpdateChurchPhotoSchema } from './components/schema';
  import UpdateChurchInfoForm from './components/update-church-info.svelte';
  import UpdateChurchPhotoForm from './components/update-church-photo.svelte';

  interface Props {
    updateChurchInfoForm: SuperValidated<Infer<UpdateChurchInfoSchema>>;
    updateChurchPhotoForm: SuperValidated<Infer<UpdateChurchPhotoSchema>>;
  }

  const { updateChurchInfoForm, updateChurchPhotoForm }: Props = $props();

  const tableState = useTableState();
</script>

<AlertDialog.Root open={tableState.getShowUpdate()}>
  <AlertDialog.Content>
    <button
      onclick={() => {
        tableState.setShowUpdate(false);
        tableState.setActiveRow(null);
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header>
      <AlertDialog.Title>Update Church</AlertDialog.Title>
      <AlertDialog.Description>
        Kindly fill up the form below to update the church.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <UpdateChurchPhotoForm {updateChurchPhotoForm} />
    <UpdateChurchInfoForm {updateChurchInfoForm} />
  </AlertDialog.Content>
</AlertDialog.Root>
