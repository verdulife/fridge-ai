<script lang="ts">
	import { UiPreferences } from '@/lib/stores';
	import { onMount } from 'svelte';
	import { TIME_RANGES } from '@/lib/consts';

	import Text from '@/components/ui/Text.svelte';
	import DishCard from '@/components/DishCard.svelte';

	function scrollToTimeRange() {
		const slider = document.querySelector('#todaySlider') as HTMLElement;
		const slideBreakfast = document.querySelector('#breakfast_dish') as HTMLElement;
		const slideLunch = document.querySelector('#lunch_dish') as HTMLElement;
		const slideDinner = document.querySelector('#dinner_dish') as HTMLElement;

		const currentHour = new Date().getHours();

		if (currentHour >= TIME_RANGES.breakfast_from && currentHour < TIME_RANGES.lunch_from) {
			slider.scrollTo({
				left: slideBreakfast?.offsetLeft || slideLunch?.offsetLeft || slideDinner?.offsetLeft || 0
			});
		} else if (currentHour >= TIME_RANGES.lunch_from && currentHour < TIME_RANGES.dinner_to) {
			slider.scrollTo({
				left: slideLunch?.offsetLeft || slideDinner?.offsetLeft || slideBreakfast?.offsetLeft || 0
			});
		} else if (currentHour >= TIME_RANGES.dinner_to) {
			slider.scrollTo({
				left: slideDinner?.offsetLeft || slideBreakfast?.offsetLeft || slideLunch?.offsetLeft || 0
			});
		}
	}

	onMount(() => {
		scrollToTimeRange();
	});
</script>

<section class="flex w-full flex-col items-start gap-4">
	<div class="flex w-full items-end justify-between px-4 lg:px-8">
		<Text class="font-semibold">Tu menú del día</Text>
	</div>

	<ul
		id="todaySlider"
		class="flex w-full snap-x snap-mandatory scroll-p-4 items-stretch gap-2 overflow-x-auto px-4 lg:scroll-p-8 lg:px-8"
	>
		{#if $UiPreferences.show_breakfast}
			<li id="breakfast_dish" class="shrink-0 snap-start">
				<DishCard type="breakfast">DESAYUNO</DishCard>
			</li>
		{/if}
		{#if $UiPreferences.show_lunch}
			<li id="lunch_dish" class="shrink-0 snap-start">
				<DishCard type="lunch">COMIDA</DishCard>
			</li>
		{/if}
		{#if $UiPreferences.show_dinner}
			<li id="dinner_dish" class="shrink-0 snap-start">
				<DishCard type="dinner">CENA</DishCard>
			</li>
		{/if}
	</ul>
</section>

<style>
	ul {
		scrollbar-width: none;
	}
</style>
