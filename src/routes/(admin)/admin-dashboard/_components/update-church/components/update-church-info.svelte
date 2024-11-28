<script lang="ts">
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { updateChurchInfoSchema, type UpdateChurchInfoSchema } from './schema';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { useTableState } from '../../table/tableState.svelte';
  import Combobox from '$lib/components/gen/Combobox.svelte';
  import Textarea from '$lib/components/ui/textarea/textarea.svelte';
  import { convertTo12HourFormat, timeList } from '$lib';
  import Loader from 'lucide-svelte/icons/loader';

  interface Props {
    updateChurchInfoForm: SuperValidated<Infer<UpdateChurchInfoSchema>>;
  }

  const { updateChurchInfoForm }: Props = $props();

  const tableState = useTableState();

  const form = superForm(updateChurchInfoForm, {
    validators: zodClient(updateChurchInfoSchema),
    id: 'updateChurchInfoForm',
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

  $effect(() => {
    if (tableState.getActiveRow()) {
      $formData.id = tableState.getActiveRow()?.id ?? 0;
      $formData.name = tableState.getActiveRow()?.name ?? '';
      $formData.description = tableState.getActiveRow()?.description ?? '';
      $formData.openT = convertTo12HourFormat(tableState.getActiveRow()?.open_time ?? '') ?? '';
      $formData.closeT = convertTo12HourFormat(tableState.getActiveRow()?.close_time ?? '') ?? '';
      $formData.price = tableState.getActiveRow()?.price ?? 0;

      return () => {
        form.reset();
      };
    }
  });
</script>

<form method="POST" action="?/updateChurchInfoEvent" use:enhance>
  <input name="id" type="hidden" bind:value={$formData.id} />
  <Form.Field {form} name="name">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Church Name</Form.Label>
        <Input {...props} bind:value={$formData.name} placeholder="Church Name" />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="openT">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Open Time</Form.Label>
        <Combobox
          selections={timeList}
          name="Select open time"
          bind:selected={$formData.openT}
          placeholder="Select Open Time"
        />
        <input name={props.name} type="hidden" bind:value={$formData.openT} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="closeT">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Closing Time</Form.Label>
        <Combobox
          selections={timeList}
          name="Select closing time"
          bind:selected={$formData.closeT}
          placeholder="Select Closing Time"
        />
        <input name={props.name} type="hidden" bind:value={$formData.closeT} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="price">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Price</Form.Label>
        <Input type="number" {...props} bind:value={$formData.price} placeholder="Price" />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="description">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Description</Form.Label>
        <Textarea {...props} bind:value={$formData.description} placeholder="Description" />
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
