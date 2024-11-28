<script lang="ts">
  import { ImageUp } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import type { ClassNameValue } from 'tailwind-merge';

  interface Props {
    imageLink: File | null;
    class?: ClassNameValue;
    name?: string;
  }

  let { imageLink = $bindable(), class: className, name }: Props = $props();

  let image = $state<File | null>(null);
  let url = $state<string | null>(null);
</script>

{#if imageLink}
  <div class="">
    <button
      onclick={(e) => {
        imageLink = null;
        image = null;
      }}
      type="button"
      class="group relative"
    >
      <div
        class="bottom-0 left-0 right-0 top-0 hidden items-center justify-center rounded-lg bg-black/50 group-hover:absolute group-hover:flex"
      >
        <span class="text-sm font-bold text-white">Remove</span>
      </div>
      <img
        src={url}
        alt="uploadedimage"
        class={cn('h-[128px] min-w-[161.13px] rounded-lg', className)}
      />
    </button>
  </div>
{:else}
  <label
    class={cn(
      'flex max-w-fit cursor-pointer flex-col items-center gap-2 rounded-lg bg-secondary p-10',
      className
    )}
  >
    <ImageUp />
    <input
      class="hidden"
      type="file"
      accept="image/png, image/jpeg"
      oninput={(e) => {
        image = e.currentTarget.files?.item(0) as File;
        imageLink = e.currentTarget.files?.item(0) as File;
        url = URL.createObjectURL(image);
      }}
    />
    <span class="text-xs font-bold text-muted-foreground">{name}</span>
  </label>
{/if}
