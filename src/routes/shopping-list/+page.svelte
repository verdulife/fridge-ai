<script lang="ts">
	import type { DayType, IngredientsType } from '@/lib/types';

	import { Menus, UserPreferences, UiPreferences } from '@/lib/stores';
	import { formatIngredient, formatPrice, setDislike, setLike } from '@/lib/utils';

	import Text from '@/components/ui/Text.svelte';
	import Heading from '@/components/ui/Heading.svelte';
	import Box from '@/components/ui/Box.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Like from '@/assets/Like.svelte';
	import Dislike from '@/assets/Dislike.svelte';

	let groupedMenus: Record<string, IngredientsType[]> = {};

	$: groupMenusByDay = Object.groupBy($Menus, ({ week_day }: DayType) => {
		return week_day.toLocaleLowerCase();
	});

	$: totalPricing = $Menus.reduce((acc: number, curr: DayType) => {
		const price = curr.aproximate_price_in_spain_euros || 0;
		return acc + price;
	}, 0);

	$: for (const week_day in groupMenusByDay) {
		const menu = groupMenusByDay[week_day]?.[0];
		if (!menu) continue;

		const breakfastMenuItems = $UiPreferences.show_breakfast ? menu.breakfast.menu_ingredients : [];
		const lunchMenuItems = $UiPreferences.show_lunch ? menu.lunch.menu_ingredients : [];
		const dinnerMenuItems = $UiPreferences.show_dinner ? menu.dinner.menu_ingredients : [];

		const allMenuItems = [...breakfastMenuItems, ...lunchMenuItems, ...dinnerMenuItems];

		const groupedIngredients = Object.groupBy(allMenuItems, ({ name }: IngredientsType) => name);
		const mergedMenuItems = Object.entries(groupedIngredients).map(([name, ingredients]) => ({
			name,
			amount: ingredients?.reduce((acc, curr) => +acc + +curr.amount, 0),
			unit: ingredients?.[0]?.unit
		})) as IngredientsType[];

		groupedMenus[week_day] = mergedMenuItems;
	}
</script>

<div class="flex w-full flex-col items-start p-4 lg:p-8">
	<Heading as="h1" class="!text-3xl font-bold">Tu lista de la compra</Heading>
	<Text class="max-w-xs text-neutral-400 lg:max-w-md ">
		Todos los ingredientes que necesitas para tu menú semanal, agrupados por día.

		<span>
			{formatPrice(totalPricing)}
		</span>
	</Text>

	{#each Object.entries(groupedMenus) as [day, ingredients]}
		<section class="mt-8 flex w-full flex-col gap-4">
			<Text class="flex items-center justify-between font-semibold">
				<span class="capitalize">{day}</span>
				{#if groupMenusByDay[day]}
					<span class="rounded-full bg-gray-200 px-3 py-1 text-xs font-bold">
						Coste aprox. {formatPrice(groupMenusByDay[day][0].aproximate_price_in_spain_euros)}
					</span>
				{/if}
			</Text>

			<ul class="grid grid-cols-1 gap-1 lg:grid-cols-2">
				{#each ingredients as ingredient}
					<li class="flex w-full flex-col gap-2">
						<Box class="flex h-full items-center justify-between gap-4 p-4">
							<Text class="first-letter:uppercase">{formatIngredient(ingredient)}</Text>

							<aside class="flex items-center gap-2">
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
		</section>
	{/each}
</div>
