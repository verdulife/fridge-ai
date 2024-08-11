<script lang="ts">
	import { NUTRISCORE_LIB, UI_COLORS } from '@/lib/consts';
	import { EvalMenus, UiPreferences, UserPreferences, Menus } from '@/lib/stores';
	import { generate, onlyMenuTitles } from '@/lib/utils';

	import Dialog from '@/components/ui/Dialog.svelte';
	import Heading from './ui/Heading.svelte';
	import Text from './ui/Text.svelte';
	import Button from './ui/Button.svelte';
	import Ai from '@/assets/Ai.svelte';
	import EvalDisc from './EvalDisc.svelte';
	import type { DayType } from '@/lib/types';
	import Scale from '@/assets/Scale.svelte';
	import Box from './ui/Box.svelte';

	export let open = false;
	let isLoading = false;

	async function generateEvaluation() {
		isLoading = true;

		try {
			const res = await generate('/api/eval-menus', {
				user_preferences: $UserPreferences,
				week_menus: onlyMenuTitles()
			});

			$EvalMenus = res;
			console.log('Evaluation done');
		} catch {
			console.log(`Error generating evaluation`);
		}

		isLoading = false;
	}

	function calcArithmeticAverageFromMenus() {
		const totalDishes = $Menus.reduce((acc: number, day: DayType) => {
			if (day.breakfast) acc += 1;
			if (day.lunch) acc += 1;
			if (day.dinner) acc += 1;

			return acc;
		}, 0);

		const sumeAllDishesScore = $Menus.reduce((acc: number, day: DayType) => {
			if (day.breakfast) acc += NUTRISCORE_LIB[day.breakfast.nutritional_score];
			if (day.lunch) acc += NUTRISCORE_LIB[day.lunch.nutritional_score];
			if (day.dinner) acc += NUTRISCORE_LIB[day.dinner.nutritional_score];

			return acc;
		}, 0);

		const average = sumeAllDishesScore / totalDishes;
		const clotestScore = Object.values(NUTRISCORE_LIB).reduce(function (acc, curr) {
			return Math.abs(curr - average) < Math.abs(acc - average) ? curr : acc;
		});
		const nutritionalKey = Object.keys(NUTRISCORE_LIB).find(
			(key) => NUTRISCORE_LIB[key] === clotestScore
		);

		return nutritionalKey;
	}

	function getTotalCalories() {
		return $Menus.reduce((acc: number, day: DayType) => {
			if (day.breakfast) acc += day.breakfast.calories;
			if (day.lunch) acc += day.lunch.calories;
			if (day.dinner) acc += day.dinner.calories;

			return acc;
		}, 0);
	}
</script>

<Dialog bind:open>
	<article
		class="mx-auto flex size-full max-w-4xl flex-col items-start gap-8 overflow-y-auto overflow-x-hidden overscroll-contain px-6 pb-24 pt-16 lg:p-16 lg:pb-32"
	>
		<header class="flex flex-col items-start gap-4">
			<Heading>Evaluación de menú</Heading>

			<Text class="flex items-center gap-1 text-neutral-400">
				Aqui puedes evaluar tu menú semanal y obtener recomendaciones y datos nutricionales.
			</Text>

			{#if isLoading}
				<Button class="flex items-center gap-1 px-4 py-2 text-sm font-semibold">
					<script src="https://cdn.lordicon.com/lordicon.js"></script>
					<lord-icon
						src="https://cdn.lordicon.com/jpgpblwn.json"
						trigger="loop"
						state="loop-line"
						colors={`primary:${$UiPreferences.dark_mode ? UI_COLORS.btn_dark : UI_COLORS.btn_light}`}
						style="width:20px;height:20px"
					>
					</lord-icon>
				</Button>
			{:else}
				<div class="flex items-center gap-2">
					<Button
						class="flex items-center gap-1 py-2 pl-3 pr-4 text-sm font-semibold"
						click={generateEvaluation}
					>
						<Ai class="size-5" />
						Reevaluar
					</Button>
				</div>

				<main class="flex flex-col gap-2">
					<EvalDisc score={$EvalMenus.score}>Calidad</EvalDisc>
					<span
						class="bg-ora flex size-10 items-center justify-center gap-1 rounded-full font-bold text-white"
						class:bg-green-500={calcArithmeticAverageFromMenus() === 'A'}
						class:bg-green-800={calcArithmeticAverageFromMenus() === 'B'}
						class:bg-yellow-400={calcArithmeticAverageFromMenus() === 'C'}
						class:bg-orange-500={calcArithmeticAverageFromMenus() === 'D'}
						class:bg-red-600={calcArithmeticAverageFromMenus() === 'E'}
					>
						{calcArithmeticAverageFromMenus()}
					</span>

					<Text class="flex items-center gap-1 text-neutral-400">
						<Scale class="size-5" />
						{getTotalCalories()} cal
					</Text>
				</main>
			{/if}
		</header>
	</article>
</Dialog>

<style>
	article {
		scrollbar-width: none;
	}
</style>
