<script lang="ts">
	import { CurrentDay, UiPreferences } from '@/lib/stores';

	import Today from '@/components/Today.svelte';
	import TodaySlider from '@/components/TodaySlider.svelte';
	import ShoppingList from '@/components/ShoppingList.svelte';

	let guide: any;

	async function loadGuide() {
		if ($UiPreferences.guide_done) return;
		guide = (await import('@/components/Guide.svelte')).default;
	}
</script>

<div id="welcome" class="flex w-full flex-col items-start gap-8 py-6 lg:py-8">
	<svelte:component this={guide} />

	<Today bind:currentDay={$CurrentDay} />
	<TodaySlider />
	<ShoppingList />
</div>
