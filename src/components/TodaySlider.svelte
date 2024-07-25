<script lang="ts">
	import type { DayType } from '@/lib/types';
	import { CurrentDay, Menus } from '@/lib/stores';

	import Text from '@/components/ui/Text.svelte';
	import DishCard from '@/components/DishCard.svelte';
	import Ai from '@/assets/Ai.svelte';
	import Button from './ui/Button.svelte';

	export let click: () => void;

	$: todayMenuIndex = $Menus.findIndex(
		(menu: DayType) => menu.week_day.toLocaleLowerCase() === $CurrentDay
	);
</script>

<section class="flex w-full flex-col items-start gap-4">
	<div class="flex w-full items-end justify-between px-4 lg:px-8">
		<Text class="font-semibold">Tu menú del día</Text>
		<Button class="flex items-center gap-2 px-3 py-1" {click}>
			<Ai class="size-5" />
		</Button>
	</div>

	<ul
		class="flex w-full snap-x snap-mandatory scroll-p-4 items-stretch gap-2 overflow-x-auto px-4 lg:scroll-p-8 lg:px-8"
	>
		<li class="shrink-0 snap-start">
			<DishCard bind:dish={$Menus[todayMenuIndex].breakfast}>DESAYUNO</DishCard>
		</li>
		<li class="shrink-0 snap-start">
			<DishCard bind:dish={$Menus[todayMenuIndex].lunch}>COMIDA</DishCard>
		</li>
		<li class="shrink-0 snap-start">
			<DishCard bind:dish={$Menus[todayMenuIndex].dinner}>CENA</DishCard>
		</li>
	</ul>
</section>

<style>
	ul {
		scrollbar-width: none;
	}
</style>
