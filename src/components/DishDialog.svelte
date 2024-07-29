<script lang="ts">
	import type { MealType } from '@/lib/types';

	import { readDataStream } from 'ai';
	import { formatIngredient } from '@/lib/utils';
	import { CONFIRM_MESSAGES } from '@/lib/consts';

	import Dialog from '@/components/ui/Dialog.svelte';
	import Heading from '@/components/ui/Heading.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Time from '@/assets/Time.svelte';
	import Box from '@/components/ui/Box.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Ai from '@/assets/Ai.svelte';

	export let dish: Array<MealType>;
	export let open = false;

	async function generateRecipe() {
		if (dish.recipe) {
			const check = confirm(CONFIRM_MESSAGES.remake_recipe);
			if (!check) return;
		}

		const res = await fetch('/api/generate-recipe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				menu_label: dish.menu_label,
				menu_ingredients: dish.menu_ingredients,
				time_to_prepare: dish.time_to_prepare
			})
		});

		if (!res.ok || !res.body) return;
		const reader = res.body.getReader();
		dish.recipe = '';

		for await (const { type, value } of readDataStream(reader)) {
			if (type === 'text') {
				dish.recipe += value;
			}
		}
	}
</script>

<Dialog bind:open>
	<article
		class="mx-auto flex size-full max-w-4xl flex-col items-start gap-8 overflow-y-auto overflow-x-hidden overscroll-contain px-6 pb-24 pt-16 lg:p-16 lg:pb-32"
	>
		<header class="flex flex-col gap-4">
			<Heading>{dish.menu_label}</Heading>

			<Text class="flex items-center gap-1 text-xs uppercase text-neutral-400">
				<Time class="size-5" />
				{!Number(dish.time_to_prepare)
					? dish.time_to_prepare
					: `${dish.time_to_prepare} minutos`}
			</Text>
		</header>

		<main class="flex w-full flex-col gap-4">
			<Heading as="h3" class="text-xl">Ingredientes</Heading>

			<ul class="flex w-full flex-wrap gap-1">
				{#each dish.menu_ingredients as ingredient}
					<li class="flex flex-col gap-2">
						<Box class="flex h-full items-center justify-between gap-4 px-4 py-2">
							<Text class="first-letter:uppercase">{formatIngredient(ingredient)}</Text>
						</Box>
					</li>
				{/each}
			</ul>
		</main>

		<footer class="flex flex-col items-start gap-4">
			<Heading as="h3" class="text-xl">Preparación</Heading>

			{#if dish.recipe}
				<Text>
					{@html dish.recipe}
				</Text>
			{/if}

			<Button class="mt-4 flex items-center gap-2 py-2 pl-4 pr-6" click={generateRecipe}>
				<Ai />
				{dish.recipe ? 'Regenerar preparación' : 'Generar preparación'}
			</Button>
		</footer>
	</article>
</Dialog>

<style>
	article {
		scrollbar-width: none;
	}
</style>
