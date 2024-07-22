<script lang="ts">
	import type { DayType, MealType } from '@/lib/types';

	import { readDataStream } from 'ai';
	import { Menus, UserPreferences, CurrentDay } from '@/lib/stores';

	import Heading from '@/components/ui/Heading.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Ai from '@/assets/Ai.svelte';
	import Text from './ui/Text.svelte';

	export let dish: Array<MealType>;

	function moreInfo() {
		console.log('more info');
	}

	async function generateMeal() {
		const res = await fetch('/api/generate-meal', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_preferences: $UserPreferences,
				current_meal: dish[0],
				week_menus: $Menus
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

		try {
			const parsedData = JSON.parse(data);
			const todayMenu = $Menus.find(
				(menu: DayType) => menu.week_day.toLocaleLowerCase() === $CurrentDay
			);
			todayMenu.breakfast = [parsedData, ...todayMenu.breakfast];
			dish[0] = parsedData;
		} catch (error) {
			alert('Error al generar menús. Intenta nuevamente.');
			return {};
		}
	}
</script>

<article
	class="flex aspect-[4/3] w-full flex-col items-start gap-4 rounded-xl bg-neutral-900 px-4 py-5"
>
	<header class="flex w-full items-center justify-between">
		<span class="rounded-full bg-neutral-700 px-3 py-1 text-xs font-semibold"><slot /></span>
	</header>

	<Heading as="h3" class="text-xl">{dish[0].menu_label}</Heading>
	<Text>{dish[0].time_to_prepare}</Text>

	<footer class="mt-auto flex w-full items-center">
		<Button click={moreInfo} class="border border-neutral-200 text-sm">Más info</Button>
		<Button click={generateMeal}><Ai /> Generar</Button>
	</footer>
</article>
