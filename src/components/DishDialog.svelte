<script lang="ts">
	import type { MealType } from '@/lib/types';
	import { readDataStream } from 'ai';

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
		const res = await fetch('/api/generate-recipe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				menu_label: dish[0].menu_label,
				menu_ingredients: dish[0].menu_ingredients,
				time_to_prepare: dish[0].time_to_prepare
			})
		});

		if (!res.ok || !res.body) return;

		const reader = res.body.getReader();
		dish[0].recipe = '';

		for await (const { type, value } of readDataStream(reader)) {
			if (type === 'text') {
				dish[0].recipe += value;
			}
		}
	}
</script>

<Dialog bind:open>
	<article
		class="mx-auto flex size-full max-w-4xl flex-col items-start gap-8 overflow-y-auto overflow-x-hidden overscroll-contain px-4 py-16 lg:p-16"
	>
		<header class="flex flex-col gap-4">
			<Heading>{dish[0].menu_label}</Heading>

			<Text class="flex items-center gap-1 text-xs uppercase text-neutral-400">
				<Time class="size-5" />
				{dish[0].time_to_prepare}
			</Text>
		</header>

		<main class="flex w-full flex-col gap-4">
			<Heading as="h3" class="text-xl">Ingredientes</Heading>

			<ul class="flex w-full flex-wrap gap-1">
				{#each dish[0].menu_ingredients as ingredient}
					<li class="flex flex-col gap-2">
						<Box class="flex h-full items-center justify-between gap-4 px-4 py-2">
							<Text class="first-letter:uppercase">{ingredient}</Text>
						</Box>
					</li>
				{/each}
			</ul>
		</main>

		<footer class="flex flex-col items-start gap-4">
			<Heading as="h3" class="text-xl">Receta</Heading>

			{#if dish[0].recipe}
				<Text>
					{@html dish[0].recipe}
				</Text>
			{/if}

			<Button class="flex gap-2 items-center pl-4 pr-6 py-2 mt-4" click={generateRecipe}>
				<Ai />
				{dish[0].recipe ? 'Regenerar receta' : 'Generar receta'}
			</Button>
		</footer>
	</article>
</Dialog>
