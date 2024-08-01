<script lang="ts">
	import type { DayType } from '@/lib/types';

	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { Menus, UserPreferences, UiPreferences, CurrentDay } from '@/lib/stores';
	import { UI_COLORS } from '@/lib/consts';
	import { generate, getCurrentSeason, onlyMenuTitles } from '@/lib/utils';

	import Heading from '@/components/ui/Heading.svelte';
	import Ai from '@/assets/Ai.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Plus from '@/assets/Plus.svelte';
	import Time from '@/assets/Time.svelte';
	import Box from '@/components/ui/Box.svelte';
	import Button from '@/components/ui/Button.svelte';
	import DishDialog from '@/components/DishDialog.svelte';

	export let type: 'breakfast' | 'lunch' | 'dinner';
	export let day: string;

	$: dish = $Menus.find((menu: DayType) => menu.week_day.toLocaleLowerCase() === day)[type];

	let isLoading = false;
	let open = false;
	$: meals_state = {
		breakfast: true,
		lunch: true,
		dinner: true
	};

	function openDialog() {
		open = true;
	}

	async function generateTodayMeal() {
		if (!browser || dish?.label) return;
		isLoading = true;
		meals_state = { breakfast: true, lunch: true, dinner: true };

		try {
			const res = await generate('/api/generate-meal', {
				user_preferences: $UserPreferences,
				meal_type: type,
				day,
				week_menus: onlyMenuTitles(),
				current_season: getCurrentSeason()
			});

			$Menus = $Menus.map((menu: DayType) => {
				if (menu.week_day.toLocaleLowerCase() === day) menu[type] = res;
				return menu;
			});

			console.log(`${type} done`);
		} catch {
			meals_state[type] = false;
			console.log(`Error generating ${type}`);
		}

		isLoading = false;
	}

	/* async function regenerateMeal() {
		const check = confirm(CONFIRM_MESSAGES.remake_dish);
		if (!check) return;

		meals_state[type] = true;
		isLoading = true;

		const { label, ingredients, time_to_prepare, approximate_price_euros } = await generate(
			'/api/generate-dish',
			{
				user_preferences: $UserPreferences,
				current_dish: dish,
				week_menus: onlyMenuTitles(),
				current_season: getCurrentSeason()
			}
		);

		if (label) {
			dish = { label, ingredients, time_to_prepare, approximate_price_euros };
		} else {
			meals_state[type] = false;
		}

		isLoading = false;
	} */

	$: if ($CurrentDay && $page.url.pathname !== '/menus') {
		generateTodayMeal();
	}
</script>

{#if dish?.label || $page.url.pathname !== '/menus'}
	<Box class="relative flex h-full min-h-48 w-80 flex-col items-start gap-4 p-4">
		<header class="flex w-full items-center justify-between">
			<span class="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold dark:bg-neutral-950">
				<slot />
			</span>
		</header>

		{#if dish?.label}
			<Heading as="h3" class="text-lg">{dish.label}</Heading>

			<footer
				class="mt-auto flex w-full items-center justify-between border-t border-neutral-700/20 pt-4 dark:border-neutral-800"
			>
				<Text class="flex items-center gap-1 text-xs uppercase text-neutral-400">
					<Time class="size-5" />
					{!Number(dish.time_to_prepare) ? dish.time_to_prepare : `${dish.time_to_prepare} minutos`}
				</Text>

				<aside class="flex items-center gap-2">
					<Button click={openDialog} class="more_info_dish px-3 py-1">
						<Plus class="size-5" />
					</Button>

					<Button click={generateTodayMeal} class="flex items-center justify-center px-3 py-1">
						{#if !isLoading}
							<Ai class="size-5" />
						{:else}
							<script src="https://cdn.lordicon.com/lordicon.js"></script>
							<lord-icon
								src="https://cdn.lordicon.com/jpgpblwn.json"
								trigger="loop"
								state="loop-line"
								colors={`primary:${$UiPreferences.dark_mode ? UI_COLORS.btn_dark : UI_COLORS.btn_light}`}
								style="width:20px;height:20px"
							>
							</lord-icon>
						{/if}
					</Button>
				</aside>
			</footer>
		{:else}
			<div class="absolute inset-0 flex size-full items-center justify-center">
				{#if !meals_state[type]}
					<Button
						click={() => generateTodayMeal()}
						class="flex items-center justify-center gap-1 px-3 py-1"
					>
						<Ai class="size-5" />
						Generar
					</Button>
				{:else}
					<script src="https://cdn.lordicon.com/lordicon.js"></script>
					<lord-icon
						src="https://cdn.lordicon.com/jpgpblwn.json"
						trigger="loop"
						state="loop-line"
						colors={`primary:${$UiPreferences.dark_mode ? UI_COLORS.btn_dark : UI_COLORS.btn_light}`}
						style="width:40px;height:40px"
					>
					</lord-icon>
				{/if}
			</div>
		{/if}
	</Box>
{/if}

{#if dish?.label}
	<DishDialog bind:dish bind:open />
{/if}
