<script lang="ts">
	import type { MealType } from '@/lib/types';

	import { Menus, UserPreferences, UiPreferences } from '@/lib/stores';
	import { UI_COLORS } from '@/lib/consts';
	import { generate } from '@/lib/utils';

	import Heading from '@/components/ui/Heading.svelte';
	import Ai from '@/assets/Ai.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Plus from '@/assets/Plus.svelte';
	import Time from '@/assets/Time.svelte';
	import Box from '@/components/ui/Box.svelte';
	import Button from '@/components/ui/Button.svelte';
	import DishDialog from '@/components/DishDialog.svelte';

	export let dish: Array<MealType>;
	let isLoading = false;
	let open = false;

	function openDialog() {
		open = true;
	}

	async function generateMeal() {
		isLoading = true;

		const { menu_label, menu_ingredients, time_to_prepare } = await generate('/api/generate-meal', {
			user_preferences: $UserPreferences,
			current_meal: dish[0],
			week_menus: $Menus
		});

		if (menu_label) {
			dish[0] = { menu_label, menu_ingredients, time_to_prepare };
		} else {
			alert('Error al generar menú. Intenta nuevamente.');
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
						colors={`primary:${$UiPreferences.dark_mode ? UI_COLORS.btn_dark : UI_COLORS.btn_light}`}
						style="width:20px;height:20px"
					>
					</lord-icon>
				{/if}
			</Button>
		</aside>
	</footer>
</Box>

<DishDialog bind:dish bind:open />
