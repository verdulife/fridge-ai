<script lang="ts">
	import type { DayType } from '@/lib/types';

	import { readDataStream } from 'ai';
	import { onMount } from 'svelte';
	import { CurrentDay, Menus, UserPreferences } from '@/lib/stores';
	import { AWAITING_RESPONSES } from '@/lib/consts';

	import Today from '@/components/Today.svelte';
	import TodaySlider from '@/components/TodaySlider.svelte';
	import ShoppingList from '@/components/ShoppingList.svelte';

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

	function simulateLoading() {
		setInterval(() => {
			message = AWAITING_RESPONSES[Math.floor(Math.random() * AWAITING_RESPONSES.length)];
		}, 2000);
	}

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

		console.log(data);

		try {
			const parsedData = JSON.parse(data);
			$Menus = [...$Menus, parsedData];
			return parsedData;
		} catch (error) {
			alert('Error al generar menús. Intenta nuevamente.');
			return {};
		}
	};

	onMount(() => {
		simulateLoading();
	});
</script>

<main class="mb-24 flex w-full flex-col gap-8 py-4 lg:py-8">
	<Today bind:currentDay={$CurrentDay} />
	{#if todayMenu}
		<TodaySlider data={todayMenu} />
		<ShoppingList data={todayMenu} />
	{:else}
		{#await generateTodaysMenu()}
			<p class="scroll-p-8 px-8 lg:scroll-p-16 lg:px-16">{message}</p>
		{:then data}
			<TodaySlider {data} />
			<ShoppingList {data} />
		{/await}
	{/if}
</main>
