<script lang="ts">
	import type { DayType } from '@/lib/types';

	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { CurrentDay, Menus, UserPreferences, UiPreferences } from '@/lib/stores';
	import { AWAITING_RESPONSES, ERROR_PROMPT } from '@/lib/consts';
	import { allMenuTitles, generate } from '@/lib/utils';

	import Today from '@/components/Today.svelte';
	import TodaySlider from '@/components/TodaySlider.svelte';
	import ShoppingList from '@/components/ShoppingList.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Ai from '@/assets/Ai.svelte';

	let guide: any;
	let message = AWAITING_RESPONSES[Math.floor(Math.random() * AWAITING_RESPONSES.length)];
	let success = true;

	$: todayMenu = $Menus.find((menu: DayType) => menu.week_day.toLocaleLowerCase() === $CurrentDay);

	async function generateTodaysMenu() {
		success = true;

		if (todayMenu) {
			$Menus = $Menus.filter((menu: DayType) => menu.week_day !== todayMenu.week_day);
			todayMenu = null;
		}

		const { week_day, breakfast, lunch, dinner } = await generate('/api/generate-today-menu', {
			user_preferences: $UserPreferences,
			menu_day: $CurrentDay,
			week_menus: allMenuTitles()
		});

		if (week_day) {
			$Menus = [...$Menus, { week_day, breakfast, lunch, dinner }];
		} else {
			success = false;
			alert(ERROR_PROMPT);
		}
	}

	function simulateLoading() {
		setInterval(() => {
			message = AWAITING_RESPONSES[Math.floor(Math.random() * AWAITING_RESPONSES.length)];
		}, 2000);
	}

	$: if (browser && !todayMenu) {
		simulateLoading();
		generateTodaysMenu();
	}

	onMount(async () => {
		if ($UiPreferences.guide_done) return;
		guide = (await import('@/components/Guide.svelte')).default;
	});
</script>

<div id="welcome" class="flex w-full flex-col items-start gap-8 py-6 lg:py-8">
	<svelte:component this={guide} />

	<Today bind:currentDay={$CurrentDay} />
	{#if todayMenu}
		<TodaySlider click={generateTodaysMenu} />
		<ShoppingList />
	{:else if !success}
		<Button click={generateTodaysMenu} class="ml-4 flex items-center gap-2 py-2 pl-4 pr-6 lg:ml-8">
			<Ai />
			Generar menú
		</Button>
	{:else}
		<Text class="px-4 lg:px-8">{message}</Text>
	{/if}
</div>
