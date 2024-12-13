<script lang="ts">
  import { AlignJustify } from 'lucide-svelte';
  import DarkMode from '$lib/components/gen/DarkMode.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Sheet from '$lib/components/ui/sheet';
  import { fromUserState } from '../_states/fromUserState.svelte';
  import { fromStaticRouteState } from '../_states/fromStaticRouteState.svelte';
  import Logout from './Logout.svelte';
  import { publicAPIs } from '$lib';
  import type { Snippet } from 'svelte';
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  interface Props {
    children: Snippet;
  }

  const user = fromUserState();
  const staticRoute = fromStaticRouteState();

  let mobileMenu = $state(false);

  let innerWidth = $state(0);
</script>

<svelte:window bind:innerWidth />

<nav class="sticky top-0 z-20 flex justify-between border-b-[1px] p-[1rem] backdrop-blur-lg">
  <div class="container flex justify-between">
    <div class="flex items-center gap-[0.625rem]">
      <div class="flex items-center gap-[0.625rem]">
        <DarkMode />
      </div>

      <div class="hidden items-center gap-[0.625rem] lg:flex">
        {#each staticRoute.getRoutes(user.getUser()) as route}
          <a
            onclick={() => {
              mobileMenu = false;
              staticRoute.setRoute(route.url);
            }}
            href={route.url}
            class="{staticRoute.getRoute() === route.url ? 'bg-secondary' : ''} 
            p-[0.625rem]"
          >
            {route.name}
          </a>
        {/each}
      </div>
    </div>

    <div class="hidden items-center gap-[0.625rem] lg:flex">
      {#if user.getUser()}
        <Avatar.Root>
          <Avatar.Image
            src={publicAPIs(`${user.getUser()?.id}/profile_photo`, 'Profile')}
            alt="@profile"
          />
          <Avatar.Fallback>{user.getUser()?.user_metadata.firstName[0]}</Avatar.Fallback>
        </Avatar.Root>
        <p>Hello 👋, <strong>{user.getUser()?.user_metadata.firstName}</strong></p>
        <Logout />
      {:else}
        <Button href="/authenticate">Sign In</Button>
        <Button href="/authenticate?q=sign-up">Sign Up Free</Button>
      {/if}
    </div>

    <button class="lg:hidden" onclick={() => (mobileMenu = true)}>
      <AlignJustify />
    </button>
  </div>
</nav>

<!--Mobile-->
{#if innerWidth < 1024}
  <Sheet.Root bind:open={mobileMenu}>
    <Sheet.Content side="left" class="flex flex-col justify-center gap-[1rem]">
      <div class="absolute left-0 right-0 top-0 mx-auto mt-[5rem]">
        <p class="text-center">
          Hello 👋,<strong>{user.getUser()?.user_metadata.firstName}</strong>
        </p>
      </div>
      <div class="flex flex-col gap-[1rem]">
        {#each staticRoute.getRoutes(user.getUser()) as route}
          <a
            onclick={() => {
              mobileMenu = false;
              staticRoute.setRoute(route.url);
            }}
            href={route.url}
            class="{staticRoute.getRoute() === route.url ? 'bg-secondary' : ''} 
					p-[0.625rem] text-center"
          >
            {route.name}
          </a>
        {/each}

        <div class="flex flex-col gap-[1rem]">
          {#if user.getUser()}
            <Logout />
          {:else}
            <Button href="/authenticate" onclick={() => (mobileMenu = false)}>Sign In</Button>
            <Button href="/authenticate?q=sign-up" onclick={() => (mobileMenu = false)}
              >Sign Up Free</Button
            >
          {/if}
        </div>
      </div>
    </Sheet.Content>
  </Sheet.Root>
{/if}
