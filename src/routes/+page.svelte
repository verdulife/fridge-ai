<script lang="ts">
	import { CurrentDay, Menus, UiPreferences } from '@/lib/stores';

	import Today from '@/components/Today.svelte';
	import TodaySlider from '@/components/TodaySlider.svelte';
	import ShoppingList from '@/components/ShoppingList.svelte';

	let guide: any;

	async function loadGuide() {
		if ($UiPreferences.guide_done) return;
		guide = (await import('@/components/Guide.svelte')).default;
	}

	$: currentMenu = $Menus.find((menu: any) => menu.week_day.toLocaleLowerCase() === $CurrentDay);
	$: if (currentMenu.breakfast?.label || currentMenu.lunch?.label || currentMenu.dinner?.label) {
		loadGuide();
	}
</script>

<div id="welcome" class="flex w-full flex-col items-start gap-8 py-6 lg:py-8">
	{#if guide}
		<svelte:component this={guide} />
	{/if}

	<Today bind:currentDay={$CurrentDay} />
	<TodaySlider />
	<ShoppingList />
</div>
