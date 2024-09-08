<script lang="ts">
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	let innerWidth = $state(0);

	let count = $state(20);

	const perPage = $derived(innerWidth ? 3 : 8);
	const siblingCount = $derived(innerWidth ? 1 : 0);
</script>

<svelte:window bind:innerWidth />

<Pagination.Root {count} {perPage} {siblingCount} let:pages let:currentPage>
	<Pagination.Content class="bg-secondary">
		<Pagination.Item>
			<Pagination.PrevButton>
				<ChevronLeft class="h-4 w-4" />
				<span class="hidden sm:block">Previous</span>
			</Pagination.PrevButton>
		</Pagination.Item>
		{#each pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<Pagination.Item>
					<Pagination.Ellipsis />
				</Pagination.Item>
			{:else}
				<Pagination.Item>
					<Pagination.Link {page} isActive={currentPage === page.value}>
						{page.value}
					</Pagination.Link>
				</Pagination.Item>
			{/if}
		{/each}
		<Pagination.Item>
			<Pagination.NextButton>
				<span class="hidden sm:block">Next</span>
				<ChevronRight class="h-4 w-4" />
			</Pagination.NextButton>
		</Pagination.Item>
	</Pagination.Content>
</Pagination.Root>
