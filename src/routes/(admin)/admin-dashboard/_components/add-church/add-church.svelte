<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { fileProxy, superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { type AddChurchSchema, addChurchSchema } from './schema';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import ImgPicker from '$lib/components/gen/ImgPicker.svelte';
  import Combobox from '$lib/components/gen/Combobox.svelte';
  import { timeList } from '$lib';
  import X from 'lucide-svelte/icons/x';

  interface Props {
    addChurchForm: SuperValidated<Infer<AddChurchSchema>>;
  }

  const { addChurchForm }: Props = $props();

  const form = superForm(addChurchForm, {
    validators: zodClient(addChurchSchema),
    id: 'addChurchForm',
    onUpdate: ({ result }) => {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success(data.msg);
          break;

        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  let open = $state(false);

  const file = fileProxy(form, 'photo');
</script>

<Button onclick={() => (open = true)}>Add Church</Button>

<AlertDialog.Root bind:open>
  <AlertDialog.Content>
    <button
      onclick={() => {
        form.reset();
        open = false;
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </button>

    <AlertDialog.Header>
      <AlertDialog.Title>Create New Church</AlertDialog.Title>
      <AlertDialog.Description>
        Kindly fill up the form below to create a new church.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" action="?/addChurchEvent" use:enhance>
      <Form.Field {form} name="photo">
        <Form.Control>
          {#snippet children({ props })}
            <ImgPicker bind:imageLink={$formData.photo} />
            <input name={props.name} type="file" bind:files={$file} class="hidden" />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

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

      <AlertDialog.Footer>
        <Form.Button size="sm" type="submit">Creates</Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
