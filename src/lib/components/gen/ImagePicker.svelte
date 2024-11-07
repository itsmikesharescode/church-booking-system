<script lang="ts">
  import { ImageUp } from 'lucide-svelte';

  interface Props {
    imageLink: File | null;
  }

  let { imageLink = $bindable() }: Props = $props();

  let image = $state<File | null>(null);
  let url = $state<string | null>(null);

  $effect(() => {
    // Create new object URL when image changes
    if (image) {
      url = URL.createObjectURL(image);
    }
  });
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
      <img src={url} alt="uploadedimage" class="h-[128px] w-[161.13px] rounded-lg" />
    </button>
  </div>
{:else}
  <label class="p-10t flex max-w-fit flex-col items-center gap-2 rounded-lg bg-secondary p-10">
    <ImageUp />
    <input
      class="hidden"
      type="file"
      accept="image/png, image/jpeg"
      oninput={(e) => {
        image = e.currentTarget.files?.item(0) as File;
        imageLink = e.currentTarget.files?.item(0) as File;
      }}
    />
    <span class="text-xs font-bold text-muted-foreground">Upload Photo</span>
  </label>
{/if}
