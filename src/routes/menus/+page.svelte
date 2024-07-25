<script lang="ts">
	import type { DayType } from '@/lib/types';
	import { Menus } from '@/lib/stores';
	import { WEEK_DAYS } from '@/lib/consts';

	import DishCard from '@/components/DishCard.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Ai from '@/assets/Ai.svelte';
	import Heading from '@/components/ui/Heading.svelte';
	import Text from '@/components/ui/Text.svelte';

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

<div class="flex w-full flex-col items-start gap-8 py-6 lg:py-8">
	<Heading as="h1" class="text-4xl font-bold px-4 lg:px-8">Tu menú semanal</Heading>

	{#each week_menus as menu, index}
		<section class="w-full flex flex-col gap-2">
			<div class="px-4 lg:px-8">
				<Text class="font-semibold">{WEEK_DAYS[index]}</Text>
			</div>

			<ul class="flex w-full flex-col gap-1">
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
						<Button class="ml-4 flex items-center gap-2 py-2 pl-4 pr-6 lg:ml-8">
							<Ai />
							Generar menú
						</Button>
					{/if}
				</li>
			</ul>
		</section>
	{/each}
</div>
