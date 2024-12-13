<script lang="ts">
  import { goto } from '$app/navigation';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { Result, UserQType } from '$lib/types';
  import CalendarSync from 'lucide-svelte/icons/calendar-sync';
  import { page } from '$app/stores';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import { superForm } from 'sveltekit-superforms';
  import { requestCertificateSchema, type RequestCertificateSchema } from './schema';
  import * as Form from '$lib/components/ui/form/index.js';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { toast } from 'svelte-sonner';
  import DatePicker from '$lib/components/gen/DatePicker.svelte';
  import SelectPicker from '$lib/components/gen/SelectPicker.svelte';
  import CalendarCheck2 from 'lucide-svelte/icons/calendar-check-2';
  import LoaderCircle from 'lucide-svelte/icons/loader-circle';
  import X from 'lucide-svelte/icons/x';
  interface Props {
    church: UserQType['churches'][number];
    requestCertificateForm: SuperValidated<Infer<RequestCertificateSchema>>;
  }

  const { ...restProps }: Props = $props();

  let open = $state(false);
  let memoCopy = $state<typeof restProps.church>();
  $effect(() => {
    if (open) {
      memoCopy = restProps.church;
    }
  });

  const form = superForm(restProps.requestCertificateForm, {
    validators: zodClient(requestCertificateSchema),
    id: crypto.randomUUID(),
    onUpdate: ({ result }) => {
      const { status, data } = result as Result<{ msg: string }>;
      switch (status) {
        case 200:
          toast.success('', { description: data.msg });
          open = false;
          form.reset();
          break;

        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;
</script>

<Button
  onclick={() => {
    if ($page.data.user) {
      open = true;
      return;
    }
    goto('/authenticate?error=you-must-be-logged-in');
  }}
>
  <CalendarSync class="size-4" />
  Request Certificate
</Button>
<AlertDialog.Root bind:open>
  <AlertDialog.Content>
    <button
      onclick={() => {
        open = false;
        form.reset();
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    >
      <X class="h-4 w-4" />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header>
      <AlertDialog.Title>Request Certificate</AlertDialog.Title>
    </AlertDialog.Header>

    <form method="POST" action="?/requestCertEvent" use:enhance>
      <input type="hidden" name="id" value={memoCopy?.id} />
      <Form.Field {form} name="date">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Date</Form.Label>
            <DatePicker bind:dateValueString={$formData.date} />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="certificateName">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Certificate Type</Form.Label>
            <SelectPicker
              selections={[
                {
                  label: 'Baptism Certificate',
                  value: 'Baptism Certificate'
                },
                {
                  label: 'Death Certificate',
                  value: 'Death Certificate'
                },
                {
                  label: 'Birth Certificate',
                  value: 'Birth Certificate'
                },
                {
                  label: 'Wedding Certificate',
                  value: 'Wedding Certificate'
                },
                {
                  label: 'Confessional Certificate',
                  value: 'Confessional Certificate'
                },
                {
                  label: 'House Blessing Certificate',
                  value: 'House Blessing Certificate'
                }
              ]}
              placeholder="Select a certificate type"
              bind:selected={$formData.certificateName}
            />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <AlertDialog.Footer>
        <Form.Button disabled={$submitting} class="relative">
          {#if $submitting}
            <section
              class="absolute inset-0 flex items-center justify-center rounded-lg bg-primary"
            >
              <LoaderCircle class="size-4 animate-spin" />
            </section>
          {/if}
          <CalendarCheck2 class="size-4" />
          Request
        </Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
