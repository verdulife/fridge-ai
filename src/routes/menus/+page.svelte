<script lang="ts">
	import type { DayType } from '@/lib/types';
	import { Menus } from '@/lib/stores';

	import DishCard from '@/components/DishCard.svelte';
	import Heading from '@/components/ui/Heading.svelte';
	import Text from '@/components/ui/Text.svelte';

	$: groupMenusByDay = Object.groupBy($Menus, ({ week_day }: DayType) =>
		week_day.toLocaleLowerCase()
	);
</script>

<div class="flex w-full flex-col items-start gap-8 py-6 lg:py-8">
	<Heading as="h1" class="px-4 text-4xl font-bold lg:px-8">Tu menú semanal</Heading>

	{#each Object.entries(groupMenusByDay) as [day, menu]}
		<section class="flex w-full flex-col gap-2">
			<div class="px-4 lg:px-8">
				<Text class="font-semibold">{day}</Text>
			</div>

			{#if menu}
				<ul class="flex w-full flex-col gap-1">
					<li class="flex w-full flex-col items-start gap-4">
						<ul
							class="flex w-full snap-x snap-mandatory scroll-p-4 items-stretch gap-2 overflow-x-auto px-4 lg:scroll-p-8 lg:px-8"
						>
							<li class="shrink-0 snap-start">
								<DishCard bind:dish={menu[0].breakfast}>DESAYUNO</DishCard>
							</li>

							<li class="shrink-0 snap-start">
								<DishCard bind:dish={menu[0].lunch}>COMIDA</DishCard>
							</li>

							<li class="shrink-0 snap-start">
								<DishCard bind:dish={menu[0].dinner}>CENA</DishCard>
							</li>
						</ul>
					</li>
				</ul>
			{/if}
		</section>
	{/each}
</div>
