<script lang="ts">
	import type { DayType } from '@/lib/types';

	import { onMount } from 'svelte';
	import { readDataStream } from 'ai';
	import { CurrentDay, Menus, UserPreferences } from '@/lib/stores';
	import { AWAITING_RESPONSES } from '@/lib/consts';

	import Today from '@/components/Today.svelte';
	import TodaySlider from '@/components/TodaySlider.svelte';
	import ShoppingList from '@/components/ShoppingList.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Box from '@/components/ui/Box.svelte';

	let message = AWAITING_RESPONSES[Math.floor(Math.random() * AWAITING_RESPONSES.length)];

	$: todayMenu = $Menus.find((menu: DayType) => menu.week_day.toLocaleLowerCase() === $CurrentDay);
	$: allMenuTitles = $Menus.map((menu: DayType) => {
		return {
			weekDay: menu.week_day,
			breakfast: menu.breakfast[0].menu_label,
			lunch: menu.lunch[0].menu_label,
			dinner: menu.dinner[0].menu_label
		};
	});

	const generateTodaysMenu = async () => {
		simulateLoading();

		const res = await fetch('/api/generate-today-menu', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_preferences: $UserPreferences,
				menu_day: $CurrentDay,
				week_menus: allMenuTitles
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
			$Menus = [...$Menus, parsedData];
			return parsedData;
		} catch (error) {
			alert('Error al generar menús. Intentalo de nuevo.');
			return {};
		}
	};

	function simulateLoading() {
		setInterval(() => {
			message = AWAITING_RESPONSES[Math.floor(Math.random() * AWAITING_RESPONSES.length)];
		}, 2000);
	}

	onMount(() => {
		if (todayMenu) return;

		generateTodaysMenu();
		simulateLoading();
	});
</script>

<section class="flex w-full flex-col items-start gap-8 pt-4 pb-32 lg:py-8">
	<Today bind:currentDay={$CurrentDay} />
	{#if todayMenu}
		<TodaySlider />
		<ShoppingList />
	{:else}
		<Text class="px-4 lg:px-8">{message}</Text>
	{/if}
</section>
