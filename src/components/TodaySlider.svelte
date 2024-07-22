<script lang="ts">
	import type { DayType } from '@/lib/types';
<<<<<<< HEAD
	import { UserPreferences, Menus } from '@/lib/stores';
	import { getCurrentDay } from '@/lib/utils';
	import { readDataStream } from 'ai';

	import Text from '@/components/ui/Text.svelte';
	import DishCard from '@/components/DishCard.svelte';
=======
	import { useChat } from '@ai-sdk/svelte';
	import { UserPreferences, Menus } from '@/lib/stores';
	import { getCurrentDay } from '@/lib/utils';

	import Text from '@/components/ui/Text.svelte';
	import DishCard from '@/components/DishCard.svelte';
	import Button from './ui/Button.svelte';
>>>>>>> 90f9b0c6e20096c89f211ba8360d384aca8f1089

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

<<<<<<< HEAD
	const generateTodaysMenu = async () => {
=======
	/* async function generateTodaysMenu() {
>>>>>>> 90f9b0c6e20096c89f211ba8360d384aca8f1089
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

<<<<<<< HEAD
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
=======
		if (!res.body) return;

		for await (const chunk of res.body.getReader()) {
			console.log(chunk);
		}

		
		if (!JSON.parse(data)) return;
		$Menus[todayMenuIndex] = JSON.parse(data);
	} */

	const { handleSubmit, messages } = useChat({
		api: '/api/generate-today-menu',
		body: {
			user_preferences: $UserPreferences,
			week_menus: allWeekMenusTitles
		}
	});

	function generateTodaysMenu() {
		handleSubmit();
	}

	$: console.log($messages);
>>>>>>> 90f9b0c6e20096c89f211ba8360d384aca8f1089
</script>

<section class="flex w-full flex-col items-start gap-4">
	{#if todayMenu}
		<div class="px-8 lg:px-16">
			<Text>Tu menú del día</Text>
		</div>

<<<<<<< HEAD
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
=======
		{#if todayMenu}
>>>>>>> 90f9b0c6e20096c89f211ba8360d384aca8f1089
			<ul
				class="flex snap-x snap-mandatory scroll-p-8 gap-4 overflow-x-auto px-8 lg:scroll-p-16 lg:px-16"
			>
				<li class="w-full max-w-sm shrink-0 snap-start">
<<<<<<< HEAD
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
=======
					<DishCard dish={todayMenu.breakfast}>DESAYUNO</DishCard>
				</li>
				<li class="w-full max-w-sm shrink-0 snap-start">
					<DishCard dish={todayMenu.lunch}>COMIDA</DishCard>
				</li>
				<li class="w-full max-w-sm shrink-0 snap-start">
					<DishCard dish={todayMenu.dinner}>CENA</DishCard>
				</li>
			</ul>
		{/if}
	{:else}
		<div class="px-8 lg:px-16">
			<Button click={generateTodaysMenu} class="border border-neutral-200">GENERAR MENÚ</Button>
		</div>
>>>>>>> 90f9b0c6e20096c89f211ba8360d384aca8f1089
	{/if}
</section>

<style>
	ul {
		scrollbar-width: none;
	}
</style>
