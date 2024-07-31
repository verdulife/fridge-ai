<script lang="ts">
	import type { DayType, IngredientsType } from '@/lib/types';

	import { Menus, UserPreferences } from '@/lib/stores';
	import { formatIngredient, formatPrice, setDislike, setLike } from '@/lib/utils';

	import Text from '@/components/ui/Text.svelte';
	import Heading from '@/components/ui/Heading.svelte';
	import Box from '@/components/ui/Box.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Like from '@/assets/Like.svelte';
	import Dislike from '@/assets/Dislike.svelte';
	import Price from '@/components/Price.svelte';

	let groupedMenus: Record<string, IngredientsType[]> = {};

	$: groupMenusByDay = Object.groupBy($Menus, ({ week_day }: DayType) => {
		return week_day.toLocaleLowerCase();
	});

	$: totalPricing = $Menus.reduce((acc: number, curr: DayType) => {
		const price = curr.approximate_price_euros || 0;
		return acc + price;
	}, 0);

	$: for (const week_day in groupMenusByDay) {
		const menu = groupMenusByDay[week_day]?.[0];
		if (!menu) continue;

		const breakfastMenuItems = menu.breakfast?.ingredients || [];
		const lunchMenuItems = menu.lunch?.ingredients || [];
		const dinnerMenuItems = menu.dinner?.ingredients || [];

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
	<Heading as="h1" class="flex w-full items-center justify-between !text-3xl font-bold">
		Tu lista de la compra
		<Price class="text-base font-semibold">{formatPrice(totalPricing)}</Price>
	</Heading>

	<Text class="max-w-xs text-neutral-400 lg:max-w-md ">
		Todos los ingredientes que necesitas para tu menú semanal, agrupados por día.
	</Text>

	{#each Object.entries(groupedMenus) as [day, ingredients]}
		<section class="mt-8 flex w-full flex-col gap-4">
			<Text class="flex items-center justify-between font-semibold">
				<span class="capitalize">{day}</span>
				{#if groupMenusByDay[day]?.[0].approximate_price_euros}
					<Price>{formatPrice(groupMenusByDay[day][0].approximate_price_euros)}</Price>
				{/if}
			</Text>

			{#if ingredients.length}
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
			{:else}
				<Text class="text-neutral-400">No hay ingredientes para este día</Text>
			{/if}
		</section>
	{/each}
</div>
