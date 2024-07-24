<script lang="ts">
	import type { DayType } from '@/lib/types';
	import { Menus } from '@/lib/stores';
	import { WEEK_DAYS } from '@/lib/consts';

	import Box from '@/components/ui/Box.svelte';
	import TodaySlider from '@/components/TodaySlider.svelte';
	import DishCard from '@/components/DishCard.svelte';

	const monday_menu = $Menus.find((menu: DayType) => menu.week_day.toLocaleLowerCase() === 'lunes');
	const tuesday_menu = $Menus.find(
		(menu: DayType) => menu.week_day.toLocaleLowerCase() === 'martes'
	);
	const wednesday_menu = $Menus.find(
		(menu: DayType) => menu.week_day.toLocaleLowerCase() === 'miércoles'
	);
	const thursday_menu = $Menus.find(
		(menu: DayType) => menu.week_day.toLocaleLowerCase() === 'jueves'
	);
	const friday_menu = $Menus.find(
		(menu: DayType) => menu.week_day.toLocaleLowerCase() === 'viernes'
	);
	const saturday_menu = $Menus.find(
		(menu: DayType) => menu.week_day.toLocaleLowerCase() === 'sábado'
	);
	const sunday_menu = $Menus.find(
		(menu: DayType) => menu.week_day.toLocaleLowerCase() === 'domingo'
	);

	const week_menus = [
		monday_menu,
		tuesday_menu,
		wednesday_menu,
		thursday_menu,
		friday_menu,
		saturday_menu,
		sunday_menu
	];
</script>

<section class="flex w-full flex-col items-start gap-8 px-4 pb-32 pt-4 lg:p-8">
	<h1 class="text-4xl font-bold">Tu menú semanal</h1>

	{#each week_menus as menu, index}
		<h2 class="text-xl font-bold">{WEEK_DAYS[index]}</h2>
		<ul class="flex flex-col gap-1">
			<li class="flex w-full flex-col items-start gap-4">
				{#if menu}
					<ul
						class="flex w-full snap-x snap-mandatory scroll-p-4 items-stretch gap-2 overflow-x-auto px-4 lg:scroll-p-8 lg:px-8"
					>
						<li class="shrink-0 snap-start">
							<DishCard bind:dish={menu.breakfast}>DESAYUNO</DishCard>
						</li>
						<li class="shrink-0 snap-start">
							<DishCard bind:dish={menu.lunch}>COMIDA</DishCard>
						</li>
						<li class="shrink-0 snap-start">
							<DishCard bind:dish={menu.dinner}>CENA</DishCard>
						</li>
					</ul>
				{:else}
					<button>Generar menú</button>
				{/if}
			</li>
		</ul>
	{/each}
</section>
