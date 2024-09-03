<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	interface Props {
		deleteSignal: boolean;
	}

	let { deleteSignal = $bindable() }: Props = $props();
</script>

<AlertDialog.Root bind:open={deleteSignal}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer class="gap-[0.625rem] sm:gap-0">
			<Button
				variant="secondary"
				onclick={() => {
					deleteSignal = false;
				}}
			>
				Cancel
			</Button>
			<Button>Proceed</Button>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
