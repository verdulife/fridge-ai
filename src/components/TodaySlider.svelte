<script lang="ts">
	import type { DayType } from '@/lib/types';
	import { UserPreferences, Menus } from '@/lib/stores';
	import { getCurrentDay } from '@/lib/utils';
	import { readDataStream } from 'ai';

	import Text from '@/components/ui/Text.svelte';
	import DishCard from '@/components/DishCard.svelte';

	const todayMenuIndex = $Menus.findIndex(
		(menu: DayType) => menu.week_day.toLocaleLowerCase() === getCurrentDay().toLocaleLowerCase()
	);

	$: todayMenu = $Menus[todayMenuIndex];
	$: allWeekMenusTitles = $Menus.map((menu: DayType) => {
		return {
			weekDay: menu.week_day,
			breakfast: menu.breakfast[0].menu_label,
			lunch: menu.lunch[0].menu_label,
			dinner: menu.dinner[0].menu_label
		};
	});

	const generateTodaysMenu = async () => {
		const res = await fetch('/api/generate-today-menu', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_preferences: $UserPreferences,
				week_menus: allWeekMenusTitles
			})
		});

		if (!res.ok || !res.body) return;

		const reader = res.body.getReader();
		let data = '';

		for await (const { type, value } of readDataStream(reader)) {
			if (type === 'text') {
				data += value;
			}
		}

		const parsedData = JSON.parse(data);
		console.log(parsedData);

		if (!parsedData) return;
		$Menus = [...$Menus, parsedData];

		return parsedData;
	};
</script>

<section class="flex w-full flex-col items-start gap-4">
	{#if todayMenu}
		<div class="px-8 lg:px-16">
			<Text>Tu menú del día</Text>
		</div>

		<ul
			class="flex snap-x snap-mandatory scroll-p-8 gap-4 overflow-x-auto px-8 lg:scroll-p-16 lg:px-16"
		>
			<li class="w-full max-w-sm shrink-0 snap-start">
				<DishCard dish={todayMenu.breakfast}>DESAYUNO</DishCard>
			</li>
			<li class="w-full max-w-sm shrink-0 snap-start">
				<DishCard dish={todayMenu.lunch}>COMIDA</DishCard>
			</li>
			<li class="w-full max-w-sm shrink-0 snap-start">
				<DishCard dish={todayMenu.dinner}>CENA</DishCard>
			</li>
		</ul>
	{:else}
		{#await generateTodaysMenu()}
			<p class="scroll-p-8 px-8 lg:scroll-p-16 lg:px-16">Buscando tu menú...</p>
		{:then { breakfast, lunch, dinner }}
			<ul
				class="flex snap-x snap-mandatory scroll-p-8 gap-4 overflow-x-auto px-8 lg:scroll-p-16 lg:px-16"
			>
				<li class="w-full max-w-sm shrink-0 snap-start">
					<DishCard dish={breakfast}>DESAYUNO</DishCard>
				</li>
				<li class="w-full max-w-sm shrink-0 snap-start">
					<DishCard dish={lunch}>COMIDA</DishCard>
				</li>
				<li class="w-full max-w-sm shrink-0 snap-start">
					<DishCard dish={dinner}>CENA</DishCard>
				</li>
			</ul>
		{/await}
	{/if}
</section>

<style>
	ul {
		scrollbar-width: none;
	}
</style>
