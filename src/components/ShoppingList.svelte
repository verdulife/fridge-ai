<script lang="ts">
	import type { DayType } from '@/lib/types';
	import { Menus } from '@/lib/stores';
	import { getCurrentDay } from '@/lib/utils';

	import Text from '@/components/ui/Text.svelte';

	$: todayMenu = $Menus.find(
		(menu: DayType) => menu.week_day.toLocaleLowerCase() === getCurrentDay().toLocaleLowerCase()
	);

	$: breakfastMenuItems = todayMenu?.breakfast[0].menu_items ?? [];
	$: lunchMenuItems = todayMenu?.lunch[0].menu_items ?? [];
	$: dinnerMenuItems = todayMenu?.dinner[0].menu_items ?? [];
	$: allMenuItems = [...breakfastMenuItems, ...lunchMenuItems, ...dinnerMenuItems];
</script>

<section class="flex flex-col gap-4 px-8 lg:px-16">
	<Text>Ingredientes para hoy</Text>

	{#if allMenuItems.length > 0}
		<ul class="flex flex-col gap-1">
			{#each allMenuItems as menuItem}
				<li class="flex w-full flex-col gap-2">
					<article class="rounded-lg bg-neutral-900 p-4">
						<Text>{menuItem.label} ({menuItem.amount})</Text>
					</article>
				</li>
			{/each}
		</ul>
	{/if}
</section>
