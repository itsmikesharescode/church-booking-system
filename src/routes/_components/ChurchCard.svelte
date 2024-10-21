<script lang="ts">
  import CreateReservation from './_operations/CreateReservation.svelte';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import type { ReservationSchema } from './_operations/schema';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { ChurchType } from '$lib/types';
  import * as Avatar from '$lib/components/ui/avatar';
  import { convertTo12HourFormat, publicAPIs } from '$lib';

  interface Props {
    reservationForm: SuperValidated<Infer<ReservationSchema>>;
    index: number;
    church: ChurchType;
  }

  const { ...props }: Props = $props();

  const isOdd = () => {
    return props.index % 2 !== 0;
  };

  let innerWidth = $state(0);
</script>

<svelte:window bind:innerWidth />

{#snippet Photo()}
  <div class="flex flex-col gap-[0.625rem]">
    <Avatar.Root class="h-[250px] w-full rounded-none md:w-[500px]">
      <Avatar.Image src={publicAPIs(props.church.photo_path, 'Church')} alt="@shadcn" class="" />
      <Avatar.Fallback class="rounded-none">Loading ...</Avatar.Fallback>
    </Avatar.Root>
    <div class="flex">
      <CreateReservation church={props.church} reservationForm={props.reservationForm} />
    </div>
  </div>
{/snippet}

{#snippet Body()}
  <div class="">
    <p class="text-2xl">{props.church.name}</p>
    <p class="text-muted-foreground">
      ({convertTo12HourFormat(props.church.open_time)} - {convertTo12HourFormat(
        props.church.close_time
      )})
    </p>
    <pre class="text-wrap font-sans leading-7">{props.church.description}</pre>
  </div>
{/snippet}

<div class="">
  <div
    class="grid gap-[1.25rem] {isOdd() ? 'md:grid-cols-[500px,1fr]' : 'md:grid-cols-[1fr,500px]'}"
  >
    {#if innerWidth <= 768}
      {@render Photo()}
      {@render Body()}
    {:else if isOdd()}
      {@render Photo()}
      {@render Body()}
    {:else}
      {@render Body()}
      {@render Photo()}
    {/if}
  </div>
</div>
