<script lang="ts">
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { updateChurchPhotoSchema, type UpdateChurchPhotoSchema } from './schema';
  import { type SuperValidated, type Infer, superForm, fileProxy } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { useTableState } from '../../table/tableState.svelte';
  import Loader from 'lucide-svelte/icons/loader';
  import ImgPicker from '$lib/components/gen/ImgPicker.svelte';
  import { publicAPIs } from '$lib';
  interface Props {
    updateChurchPhotoForm: SuperValidated<Infer<UpdateChurchPhotoSchema>>;
  }

  const { updateChurchPhotoForm }: Props = $props();

  const tableState = useTableState();

  const form = superForm(updateChurchPhotoForm, {
    validators: zodClient(updateChurchPhotoSchema),
    id: 'updateChurchPhotoForm',
    onUpdate: ({ result }) => {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success(data.msg);
          form.reset();
          tableState.setShowUpdate(false);
          tableState.setActiveRow(null);
          break;

        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  const file = fileProxy(form, 'photo');

  $effect(() => {
    if (tableState.getShowUpdate()) {
      $formData.id = tableState.getActiveRow()?.id ?? 0;
      $formData.photoPath = tableState.getActiveRow()?.photo_path ?? '';
      return () => {
        form.reset();
      };
    }
  });
</script>

<form method="POST" enctype="multipart/form-data" action="?/updateChurchPhotoEvent" use:enhance>
  <input name="id" type="hidden" bind:value={$formData.id} />
  <input name="photoPath" type="hidden" bind:value={$formData.photoPath} />
  <Form.Field {form} name="photo">
    <Form.Control>
      {#snippet children({ props })}
        <ImgPicker
          hasLink={`${publicAPIs(tableState.getActiveRow()?.photo_path ?? '', 'Church')}?${crypto.randomUUID()}`}
          bind:imageLink={$formData.photo}
        />
        <input name={props.name} type="file" bind:files={$file} class="hidden" />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <section class="flex justify-end">
    <Form.Button size="sm" disabled={$submitting} class="relative">
      {#if $submitting}
        <div
          class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-sm bg-primary"
        >
          <Loader class="h-[15px] w-[15px] animate-spin" />
        </div>
      {/if}
      Update
    </Form.Button>
  </section>
</form>
