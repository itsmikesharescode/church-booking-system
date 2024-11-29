<script lang="ts">
  import Check from 'lucide-svelte/icons/check';
  import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
  import { tick } from 'svelte';
  import * as Command from '$lib/components/ui/command/index.js';
  import * as Popover from '$lib/components/ui/popover/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { cn } from '$lib/utils.js';

  interface Props {
    selectedEvent: {
      value: {
        price: number;
        description: string;
      };
      label: string;
    } | null;
  }

  let { selectedEvent = $bindable() }: Props = $props();

  const commonEvents = [
    {
      value: {
        price: 450,
        description: 'Included yung ninong at ninang tig isa'
      },
      label: 'Every Sunday Baptism'
    },

    {
      value: {
        price: 17000,
        description: 'Included: flower arrangement '
      },
      label: 'Kasal full package'
    },

    {
      value: {
        price: 1150,
        description: `Included 1 ninong at 1 ninang, (additional 50 pesos (depende sa church)  kapag may isa pang ninong or ninang)`
      },
      label: 'Ordinary day solo baptism'
    },

    {
      value: {
        price: 1000,
        description: `Optional kung mag add ka`
      },
      label: 'House blessing '
    },

    {
      value: {
        price: 1000,
        description: `Donation (100 pesos)`
      },
      label: 'Kumpisal'
    }
  ];

  let open = $state(false);
  let value = $state('');
  let triggerRef = $state<HTMLButtonElement>(null!);

  const selectedValue = $derived(commonEvents.find((f) => f.label === value));

  function closeAndFocusTrigger() {
    open = false;
    tick().then(() => {
      triggerRef.focus();
    });
  }
</script>

<Popover.Root bind:open>
  <Popover.Trigger class="w-full justify-between" bind:ref={triggerRef}>
    {#snippet child({ props })}
      <Button
        variant="outline"
        class=" justify-between"
        {...props}
        role="combobox"
        aria-expanded={open}
      >
        {selectedEvent?.label || 'Available Events'}
        <ChevronsUpDown class="opacity-50" />
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class=" p-0">
    <Command.Root>
      <Command.Input placeholder="Search event..." />
      <Command.List>
        <Command.Empty>No events found.</Command.Empty>
        <Command.Group>
          {#each commonEvents as event}
            <Command.Item
              value={event.label}
              onSelect={() => {
                if (value === event.label) {
                  value = '';
                  selectedEvent = null;
                  closeAndFocusTrigger();
                  return;
                }

                value = event.label;
                selectedEvent = event;
                closeAndFocusTrigger();
              }}
            >
              <Check class={cn('', value !== event.label && 'text-transparent')} />
              <section class="flex flex-col">
                <span>{event.label}</span>
                <span class="text-sm text-gray-500">{event.value.description}</span>
                <span class="text-sm"> ₱ {event.value.price.toLocaleString()}</span>
              </section>
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
