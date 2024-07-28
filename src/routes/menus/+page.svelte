<script lang="ts">
	import type { DayType } from '@/lib/types';

	import { Menus, UiPreferences } from '@/lib/stores';

	import DishCard from '@/components/DishCard.svelte';
	import Heading from '@/components/ui/Heading.svelte';
	import Text from '@/components/ui/Text.svelte';

	$: groupMenusByDay = Object.groupBy($Menus, ({ week_day }: DayType) =>
		week_day.toLocaleLowerCase()
	);

	function getMenuIndexByDay(day: string) {
		return $Menus.findIndex((menu: DayType) => menu.week_day.toLocaleLowerCase() === day);
	}
</script>

<div class="flex w-full flex-col items-start py-6 lg:py-8">
	<Heading as="h1" class="px-4 !text-3xl font-bold lg:px-8">Tu menú semanal</Heading>
	<Text class="max-w-xs px-4 text-neutral-400 lg:max-w-md lg:px-8">
		Todos los menús que se han generado los encontrarás aquí.
	</Text>

	{#each Object.entries(groupMenusByDay) as [day, menu]}
		<section class="mt-8 flex w-full flex-col gap-2">
			<div class="px-4 lg:px-8">
				<Text class="font-semibold capitalize">{day}</Text>
			</div>

			{#if menu}
				<ul class="flex w-full flex-col gap-1">
					<li class="flex w-full flex-col items-start gap-4">
						<ul
							class="flex w-full snap-x snap-mandatory scroll-p-4 items-stretch gap-2 overflow-x-auto px-4 lg:scroll-p-8 lg:px-8"
						>
							{#if $UiPreferences.show_breakfast}
								<li class="shrink-0 snap-start">
									<DishCard bind:dish={$Menus[getMenuIndexByDay(day)].breakfast}>DESAYUNO</DishCard>
								</li>
							{/if}
							{#if $UiPreferences.show_lunch}
								<li class="shrink-0 snap-start">
									<DishCard bind:dish={$Menus[getMenuIndexByDay(day)].lunch}>COMIDA</DishCard>
								</li>
							{/if}
							{#if $UiPreferences.show_dinner}
								<li class="shrink-0 snap-start">
									<DishCard bind:dish={$Menus[getMenuIndexByDay(day)].dinner}>CENA</DishCard>
								</li>
							{/if}
						</ul>
					</li>
				</ul>
			{/if}
		</section>
	{/each}
</div>

<style>
	ul {
		scrollbar-width: none;
	}
</style>
