<script lang="ts">
	import type { DayType } from '@/lib/types';

	import { Menus, UiPreferences } from '@/lib/stores';

	import DishCard from '@/components/DishCard.svelte';
	import Heading from '@/components/ui/Heading.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Ai from '@/assets/Ai.svelte';
	import Dialog from '@/components/ui/Dialog.svelte';
	import EvalDialog from '@/components/EvalDialog.svelte';

	let showDialog = false;

	$: groupMenusByDay = Object.groupBy($Menus, ({ week_day }: DayType) =>
		week_day.toLocaleLowerCase()
	);

	function testMenu() {
		showDialog = true;
	}
</script>

<div class="flex w-full flex-col items-start py-6 lg:py-8">
	<Heading as="h1" class="px-4 !text-3xl font-bold lg:px-8">Tu menú semanal</Heading>
	<Text class="max-w-xs px-4 text-neutral-400 lg:max-w-md lg:px-8">
		Todos los menús que se han generado los encontrarás aquí.
	</Text>

	<!-- <div class="flex items-center px-4 pt-4 lg:px-8">
		<Button class="flex items-center gap-1 py-2 pl-3 pr-4 text-sm font-semibold" click={testMenu}>
			<Ai class="size-5" />
			Valorar menús
		</Button>
	</div> -->

	{#each Object.entries(groupMenusByDay) as [day, menu]}
		<section class="mt-8 flex w-full flex-col gap-2">
			<div class="px-4 lg:px-8">
				<Text class="font-semibold capitalize">{day}</Text>
			</div>

			{#if menu?.[0].breakfast || menu?.[0].lunch || menu?.[0].dinner}
				<ul class="flex w-full flex-col gap-1">
					<li class="flex w-full flex-col items-start gap-4">
						<ul
							class="flex w-full snap-x snap-mandatory scroll-p-4 items-stretch gap-2 overflow-x-auto px-4 lg:scroll-p-8 lg:px-8"
						>
							{#if $UiPreferences.show_breakfast}
								<li class="shrink-0 snap-start">
									<DishCard type="breakfast" {day}>DESAYUNO</DishCard>
								</li>
							{/if}
							{#if $UiPreferences.show_lunch}
								<li class="shrink-0 snap-start">
									<DishCard type="lunch" {day}>COMIDA</DishCard>
								</li>
							{/if}
							{#if $UiPreferences.show_dinner}
								<li class="shrink-0 snap-start">
									<DishCard type="dinner" {day}>CENA</DishCard>
								</li>
							{/if}
						</ul>
					</li>
				</ul>
			{:else}
				<Text class="px-4 text-neutral-400 lg:px-8">No hay menús para este día</Text>
			{/if}
		</section>
	{/each}
</div>

<!-- <EvalDialog bind:open={showDialog}></EvalDialog> -->

<style>
	ul {
		scrollbar-width: none;
	}
</style>
