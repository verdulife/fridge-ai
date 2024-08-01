<script lang="ts">
	import type { DayType, IngredientsType } from '@/lib/types';

	import { CurrentDay, Menus, UiPreferences, UserPreferences } from '@/lib/stores';
	import { formatIngredient, setDislike, formatPrice } from '@/lib/utils';

	import Text from '@/components/ui/Text.svelte';
	import Box from '@/components/ui/Box.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Dislike from '@/assets/Dislike.svelte';
	import Price from '@/components/Price.svelte';

	let currentPrice: string | undefined;

	$: $CurrentDay, (allMenuItems = []);
	$: currentMenuIndex = $Menus.findIndex(
		(menu: DayType) => menu.week_day.toLocaleLowerCase() === $CurrentDay
	);

	$: breakfastMenuItems = $Menus[currentMenuIndex].breakfast?.ingredients ?? [];
	$: lunchMenuItems = $Menus[currentMenuIndex].lunch?.ingredients ?? [];
	$: dinnerMenuItems = $Menus[currentMenuIndex].dinner?.ingredients ?? [];
	$: allMenuItems = [] as IngredientsType[];

	$: if ($UiPreferences.show_breakfast) allMenuItems = [...breakfastMenuItems, ...allMenuItems];
	$: if ($UiPreferences.show_lunch) allMenuItems = [...lunchMenuItems, ...allMenuItems];
	$: if ($UiPreferences.show_dinner) allMenuItems = [...dinnerMenuItems, ...allMenuItems];

	$: groupedIngredients = Object.groupBy(allMenuItems, ({ name }: IngredientsType) =>
		name.toLocaleLowerCase()
	);

	$: mergedMenuItems = Object.entries(groupedIngredients).map(([name, ingredients]) => ({
		name,
		amount: ingredients?.reduce((acc, curr) => Number(acc) + Number(curr.amount), 0) || 0,
		unit: ingredients?.[0]?.unit
	})) as IngredientsType[];

	function calculateTodayPrice() {
		const breakfast = $UiPreferences.show_breakfast
			? $Menus[currentMenuIndex].breakfast?.approximate_price_euros || '0,00 €'
			: '0,00 €';
		const lunch = $UiPreferences.show_lunch
			? $Menus[currentMenuIndex].lunch?.approximate_price_euros || '0,00 €'
			: '0,00 €';
		const dinner = $UiPreferences.show_dinner
			? $Menus[currentMenuIndex].dinner?.approximate_price_euros || '0,00 €'
			: '0,00 €';

		const breakfast_value = breakfast.replace(',', '.').replace(' €', '');
		const lunch_value = lunch.replace(',', '.').replace(' €', '');
		const dinner_value = dinner.replace(',', '.').replace(' €', '');
		const total_value = Number(breakfast_value) + Number(lunch_value) + Number(dinner_value);

		$Menus[currentMenuIndex].approximate_price_euros = total_value;
		return formatPrice(total_value);
	}

	$: allMenuItems, (currentPrice = calculateTodayPrice());
</script>

<section class="flex w-full flex-col gap-4 px-4 lg:px-8">
	<Text class="flex items-center justify-between font-semibold">
		Ingredientes para hoy

		{#if currentPrice}
			<Price>{currentPrice}</Price>
		{/if}
	</Text>

	{#if allMenuItems.length > 0}
		<ul class="grid grid-cols-1 gap-1 lg:grid-cols-2">
			{#each mergedMenuItems as ingredient}
				<li class="flex w-full flex-col gap-2">
					<Box class="flex h-full items-center justify-between gap-4 p-4">
						<Text class="first-letter:uppercase">{formatIngredient(ingredient)}</Text>

						<aside class="like_dislike_ingredient flex items-center gap-2">
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
	{:else}
		<Text>No hay ingredientes para hoy</Text>
	{/if}
</section>
