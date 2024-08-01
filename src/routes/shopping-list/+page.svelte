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
	import Price from '@/components/Price.svelte';

	$: groupedIngredients = $Menus.reduce((acc: IngredientsType[], curr: DayType) => {
		const breakfastMenuItems = curr.breakfast?.ingredients || [];
		const lunchMenuItems = curr.lunch?.ingredients || [];
		const dinnerMenuItems = curr.dinner?.ingredients || [];

		let allMenuItems = [] as IngredientsType[];

		if ($UiPreferences.show_breakfast) allMenuItems = [...breakfastMenuItems, ...allMenuItems];
		if ($UiPreferences.show_lunch) allMenuItems = [...lunchMenuItems, ...allMenuItems];
		if ($UiPreferences.show_dinner) allMenuItems = [...dinnerMenuItems, ...allMenuItems];

		return acc.concat(allMenuItems);
	}, []);

	$: groupByName = Object.groupBy(groupedIngredients, ({ name }: IngredientsType) => {
		const singularName = name.toLocaleLowerCase().replace(/s$/, '');
		return singularName;
	});

	$: mergedMenuItems = Object.entries(groupByName).map(([name, ingredients]) => {
		return {
			name,
			amount: ingredients?.reduce((acc, curr) => +acc + +curr.amount, 0),
			unit: ingredients?.[0]?.unit
		} as IngredientsType;
	});

	$: totalPricing = $Menus.reduce((acc: number, curr: DayType) => {
		const price = curr.approximate_price_euros || 0;
		return acc + price;
	}, 0);
</script>

<div class="flex w-full flex-col items-start p-4 lg:p-8">
	<Heading as="h1" class="!text-3xl font-bold">Tu lista de la compra</Heading>

	<Text class="max-w-xs text-neutral-400 lg:max-w-md">
		Todos los ingredientes que necesitas para tu menú semanal.
	</Text>

	<section class="mt-8 flex w-full flex-col gap-4">
		{#if mergedMenuItems}
			<Text class="flex items-center justify-between font-semibold">
				<span>
					{mergedMenuItems.length} ingredientes
				</span>

				{#if totalPricing}
					<Price>{formatPrice(totalPricing)}</Price>
				{/if}
			</Text>

			<ul class="grid grid-cols-1 gap-1 lg:grid-cols-2">
				{#each mergedMenuItems as ingredient}
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
</div>
