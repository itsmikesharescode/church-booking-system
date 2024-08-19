<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Loader } from 'lucide-svelte';
	import { fromSupabaseState } from '../_states/fromSupabaseState.svelte';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';

	const supabase = fromSupabaseState();

	let open = $state(false);

	let logoutLoader = $state(false);

	const handleLogout = async () => {
		logoutLoader = true;
		const res = await supabase.get()?.auth.signOut();

		if (res) {
			const { error } = res;

			if (error) {
				toast.error('', { description: error.message });
				logoutLoader = false;
				return;
			}
			await invalidateAll();
			logoutLoader = false;
		}
	};
</script>

<Button onclick={() => (open = true)}>Log out</Button>

<AlertDialog.Root bind:open>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Log out</AlertDialog.Title>
			<AlertDialog.Description>
				You are about to log out in chuch booking system.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer class="flex flex-col gap-[0.625rem] sm:gap-0">
			<Button disabled={logoutLoader} variant="secondary" onclick={() => (open = false)}>
				Cancel
			</Button>
			<Button disabled={logoutLoader} class="relative" onclick={handleLogout}>
				{#if logoutLoader}
					<div
						class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-sm bg-primary"
					>
						<Loader class="h-[15px] w-[15px] animate-spin" />
					</div>
				{/if}
				Log out
			</Button>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
