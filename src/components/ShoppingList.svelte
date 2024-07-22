<script lang="ts">
	import Text from '@/components/ui/Text.svelte';

	export let data;

	$: breakfastMenuItems = data?.breakfast[0].menu_ingredients ?? [];
	$: lunchMenuItems = data?.lunch[0].menu_ingredients ?? [];
	$: dinnerMenuItems = data?.dinner[0].menu_ingredients ?? [];
	$: allMenuItems = [...new Set([...breakfastMenuItems, ...lunchMenuItems, ...dinnerMenuItems])];
</script>

<section class="flex flex-col gap-4 px-8 lg:px-16">
	<Text>Ingredientes para hoy</Text>

	{#if allMenuItems.length > 0}
		<ul class="flex flex-col gap-1">
			{#each allMenuItems as menuItem}
				<li class="flex w-full flex-col gap-2">
					<article class="rounded-lg bg-neutral-900 p-4">
						<Text class="first-letter:uppercase">{menuItem}</Text>
					</article>
				</li>
			{/each}
		</ul>
	{/if}
</section>
