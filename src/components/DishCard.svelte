<script lang="ts">
	import type { DayType, MealType } from '@/lib/types';

	import { readDataStream } from 'ai';
	import { Menus, UserPreferences, CurrentDay } from '@/lib/stores';

	import Heading from '@/components/ui/Heading.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Ai from '@/assets/Ai.svelte';
	import Text from './ui/Text.svelte';
	import Plus from '@/assets/Plus.svelte';

	export let dish: Array<MealType>;
	let isLoading = false;

	function moreInfo() {
		console.log('more info');
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

<article
	class="flex size-full flex-col items-start gap-4 rounded-md border border-neutral-700/20 bg-white p-6 dark:bg-neutral-900"
>
	<header class="flex w-full items-center justify-between">
		<span class="rounded-full bg-neutral-200 px-3 py-1 text-xs font-semibold dark:bg-neutral-950">
			<slot />
		</span>
	</header>

	<Heading as="h3" class="text-lg">{dish[0].menu_label}</Heading>

	<footer class="mt-auto flex w-full items-center justify-between border-t border-neutral-700/20 pt-4 dark:border-neutral-800">
		<Text class="text-sm uppercase">{dish[0].time_to_prepare}</Text>

		<aside class="flex items-center gap-2">
			<button
				on:click={moreInfo}
				class="flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-neutral-200 py-1 px-3 dark:border-neutral-700/40 dark:bg-neutral-800"
			>
				<Plus />
			</button>

			<button
				on:click={generateMeal}
				class="flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-neutral-200 py-1 px-3 dark:border-neutral-700/40 dark:bg-neutral-800"
			>
				{#if !isLoading}
					<Ai />
				{:else}
					<script src="https://cdn.lordicon.com/lordicon.js"></script>
					<lord-icon
						src="https://cdn.lordicon.com/jpgpblwn.json"
						trigger="loop"
						state="loop-line"
						colors="primary:#ffffff"
						style="width:25px;height:25px"
					>
					</lord-icon>
				{/if}
			</button>
		</aside>
	</footer>
</article>
