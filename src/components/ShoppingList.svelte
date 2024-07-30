<script lang="ts">
	import type { DayType, IngredientsType } from '@/lib/types';

	import { CurrentDay, Menus, UserPreferences } from '@/lib/stores';
	import { formatIngredient, setDislike, setLike, formatPrice } from '@/lib/utils';

	import Text from '@/components/ui/Text.svelte';
	import Box from './ui/Box.svelte';
	import Button from './ui/Button.svelte';
	import Like from '@/assets/Like.svelte';
	import Dislike from '@/assets/Dislike.svelte';

	$: currentMenu = $Menus.find(
		(menu: DayType) => menu.week_day.toLocaleLowerCase() === $CurrentDay
	);

	$: breakfastMenuItems = currentMenu.breakfast?.ingredients ?? [];
	$: lunchMenuItems = currentMenu.lunch?.ingredients ?? [];
	$: dinnerMenuItems = currentMenu.dinner?.ingredients ?? [];
	$: allMenuItems = [...breakfastMenuItems, ...lunchMenuItems, ...dinnerMenuItems];

	$: groupedIngredients = Object.groupBy(allMenuItems, ({ name }: IngredientsType) => name);
	$: mergedMenuItems = Object.entries(groupedIngredients).map(([name, ingredients]) => ({
		name,
		amount: ingredients?.reduce((acc, curr) => Number(acc) + Number(curr.amount), 0),
		unit: ingredients?.[0]?.unit
	})) as IngredientsType[];

	/* function calculateTodayPrice() {
		const breakfast = $UiPreferences.show_breakfast
			? $Menus[todayMenuIndex].breakfast.approximate_price_euros
			: '0,00 €';
		const lunch = $UiPreferences.show_lunch
			? $Menus[todayMenuIndex].lunch.approximate_price_euros
			: '0,00 €';
		const dinner = $UiPreferences.show_dinner
			? $Menus[todayMenuIndex].dinner.approximate_price_euros
			: '0,00 €';

		const breakfast_value = breakfast.replace(',', '.').replace(' €', '');
		const lunch_value = lunch.replace(',', '.').replace(' €', '');
		const dinner_value = dinner.replace(',', '.').replace(' €', '');
		const total_value = Number(breakfast_value) + Number(lunch_value) + Number(dinner_value);

		$Menus[todayMenuIndex].approximate_price_euros = total_value;
		return formatPrice(total_value);
	} */
</script>

<section class="flex w-full flex-col gap-4 px-4 lg:px-8">
	{#if allMenuItems.length > 0}
		<Text class="flex items-center justify-between font-semibold">
			Ingredientes para hoy
			<!-- <span class="rounded-full bg-gray-200 px-3 py-1 text-xs font-bold">
				Coste aprox.
				{calculateTodayPrice()}
			</span> -->
		</Text>

		<ul class="grid grid-cols-1 gap-1 lg:grid-cols-2">
			{#each mergedMenuItems as ingredient}
				<li class="flex w-full flex-col gap-2">
					<Box class="flex h-full items-center justify-between gap-4 p-4">
						<Text class="first-letter:uppercase">{formatIngredient(ingredient)}</Text>

						<aside class="like_dislike_ingredient flex items-center gap-2">
							{#if !$UserPreferences.like.includes(ingredient.name)}
								<Button class="px-3 py-1" click={() => setLike(ingredient)}>
									<Like class="size-5" />
								</Button>
							{/if}

							{#if !$UserPreferences.dislike.includes(ingredient.name)}
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
