<script lang="ts">
	import type { DayType, MealType } from '@/lib/types';

	import { readDataStream } from 'ai';
	import { Menus, UserPreferences, CurrentDay } from '@/lib/stores';

	import Heading from '@/components/ui/Heading.svelte';
	import Ai from '@/assets/Ai.svelte';
	import Text from './ui/Text.svelte';
	import Plus from '@/assets/Plus.svelte';
	import Time from '@/assets/Time.svelte';
	import Box from './ui/Box.svelte';
	import Button from './ui/Button.svelte';
	import DishDialog from './DishDialog.svelte';

	export let dish: Array<MealType>;
	let isLoading = false;
	let open = false;

	function openDialog() {
		open = true;
	}

	async function generateMeal() {
		isLoading = true;

		const res = await fetch('/api/generate-meal', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_preferences: $UserPreferences,
				current_meal: dish[0],
				week_menus: $Menus
			})
		});

		if (!res.ok || !res.body) return;

		const reader = res.body.getReader();
		let data = '';

		for await (const { type, value } of readDataStream(reader)) {
			if (type === 'text') {
				data += value;
			}
		}

		try {
			const parsedData = JSON.parse(data);
			const todayMenu = $Menus.find(
				(menu: DayType) => menu.week_day.toLocaleLowerCase() === $CurrentDay
			);
			todayMenu.breakfast = [parsedData, ...todayMenu.breakfast];
			dish[0] = parsedData;
		} catch (error) {
			alert('Error al generar menús. Intenta nuevamente.');
			return {};
		}

		isLoading = false;
	}
</script>

<Box class="flex h-full w-80 flex-col items-start gap-4 p-4">
	<header class="flex w-full items-center justify-between">
		<span class="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold dark:bg-neutral-950">
			<slot />
		</span>
	</header>

	<Heading as="h3" class="text-lg">{dish[0].menu_label}</Heading>

	<footer
		class="mt-auto flex w-full items-center justify-between border-t border-neutral-700/20 pt-4 dark:border-neutral-800"
	>
		<Text class="flex items-center gap-1 text-xs uppercase text-neutral-400">
			<Time class="size-5" />
			{dish[0].time_to_prepare}
		</Text>

		<aside class="flex items-center gap-2">
			<Button click={openDialog} class="px-3 py-1">
				<Plus class="size-5" />
			</Button>

			<Button click={generateMeal} class="flex items-center justify-center px-3 py-1">
				{#if !isLoading}
					<Ai class="size-5" />
				{:else}
					<script src="https://cdn.lordicon.com/lordicon.js"></script>
					<lord-icon
						src="https://cdn.lordicon.com/jpgpblwn.json"
						trigger="loop"
						state="loop-line"
						colors={`primary:#ffffff`}
						style="width:20px;height:20px"
					>
					</lord-icon>
				{/if}
			</Button>
		</aside>
	</footer>
</Box>

<DishDialog bind:dish bind:open />
