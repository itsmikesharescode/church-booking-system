<script lang="ts">
  import { toggleMode } from 'mode-watcher';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Moon, Sun } from 'lucide-svelte';
  import { fromThemeState } from '../../../routes/_states/fromThemeState.svelte';

  const theme = fromThemeState();

  const handleChangeTheme = () => {
    toggleMode();

    const clientMode = localStorage.getItem('mode-watcher-mode');

    if (clientMode) {
      theme.set(clientMode === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)');
    }
  };
</script>

<Button onclick={handleChangeTheme} variant="outline" size="icon">
  <Sun
    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
  />
  <Moon
    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
  />
  <span class="sr-only">Toggle theme</span>
</Button>
