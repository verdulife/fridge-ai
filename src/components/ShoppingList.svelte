<script lang="ts">
	import type { DayType } from '@/lib/types';

	import { UserPreferences } from '@/lib/stores';
	import { CurrentDay, Menus } from '@/lib/stores';
	import { formatIngredient, setDislike, setLike } from '@/lib/utils';

	import Text from '@/components/ui/Text.svelte';
	import Box from './ui/Box.svelte';
	import Button from './ui/Button.svelte';
	import Like from '@/assets/Like.svelte';
	import Dislike from '@/assets/Dislike.svelte';

	$: todayMenuIndex = $Menus.findIndex(
		(menu: DayType) => menu.week_day.toLocaleLowerCase() === $CurrentDay
	);

	$: breakfastMenuItems = $Menus[todayMenuIndex]?.breakfast[0].menu_ingredients ?? [];
	$: lunchMenuItems = $Menus[todayMenuIndex]?.lunch[0].menu_ingredients ?? [];
	$: dinnerMenuItems = $Menus[todayMenuIndex]?.dinner[0].menu_ingredients ?? [];
	$: allMenuItems = [...new Set([...breakfastMenuItems, ...lunchMenuItems, ...dinnerMenuItems])];
</script>

<section class="flex w-full flex-col gap-4 px-4 lg:px-8">
	<Text class="font-semibold">Ingredientes para hoy</Text>

	{#if allMenuItems.length > 0}
		<ul class="grid grid-cols-1 gap-1 lg:grid-cols-2">
			{#each allMenuItems as ingredient}
				<li class="flex w-full flex-col gap-2">
					<Box class="flex h-full items-center justify-between gap-4 p-4">
						<Text class="first-letter:uppercase">{formatIngredient(ingredient)}</Text>

						<aside class="flex items-center gap-2">
							{#if !$UserPreferences.like.includes(ingredient)}
								<Button class="px-3 py-1" click={() => setLike(ingredient)}>
									<Like class="size-5" />
								</Button>
							{/if}

							{#if !$UserPreferences.dislike.includes(ingredient)}
								<Button class="px-3 py-1" click={() => setDislike(ingredient)}>
									<Dislike class="size-5" />
								</Button>
							{/if}
						</aside>
					</Box>
				</li>
			{/each}
		</ul>
	{/if}
</section>
