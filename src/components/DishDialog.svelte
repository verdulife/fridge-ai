<script lang="ts">
	import type { DayType, DishType } from '@/lib/types';

	import { readDataStream } from 'ai';
	import { formatIngredient, generate } from '@/lib/utils';
	import { CONFIRM_MESSAGES, UI_COLORS } from '@/lib/consts';
	import { UiPreferences } from '@/lib/stores';

	import Dialog from '@/components/ui/Dialog.svelte';
	import Heading from '@/components/ui/Heading.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Time from '@/assets/Time.svelte';
	import Box from '@/components/ui/Box.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Ai from '@/assets/Ai.svelte';
	import Price from '@/components/Price.svelte';
	import { CurrentDay, Menus } from '@/lib/stores';
	import Error from '@/assets/Error.svelte';

	export let type: 'breakfast' | 'lunch' | 'dinner';
	export let dish: DishType;
	export let open = false;
	let editingTitle = false;
	let isLoading = false;
	let isError = false;

	function anounceError() {
		isError = true;

		setTimeout(() => {
			isError = false;
		}, 2000);
	}

	async function generateRecipe(askCheck = true) {
		if (dish.recipe && askCheck) {
			const check = confirm(CONFIRM_MESSAGES.remake_recipe);
			if (!check) return;
		}

		const res = await fetch('/api/generate-recipe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				label: dish.label,
				ingredients: dish.ingredients,
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

	function editTitle() {
		const title = document.querySelector(`[data-title="${dish.label}"]`) as HTMLElement;
		if (!title) return;

		editingTitle = true;

		const selection = window.getSelection();
		selection?.removeAllRanges();

		const range = document.createRange();
		range.selectNodeContents(title);
		selection?.addRange(range);
		title.setAttribute('contenteditable', '');
		title.focus();

		title.addEventListener('blur', (ev) => {
			ev.preventDefault();
		});
	}

	function exitEdit(discardTitle = true) {
		const title = document.querySelector(`[data-title="${dish.label}"]`) as HTMLElement;
		if (!title) return;

		editingTitle = false;
		title.blur();
		title.removeAttribute('contenteditable');
		window.getSelection()?.removeAllRanges();

		if (discardTitle || !title.textContent) {
			title.textContent = dish.label;
		}
	}

	async function genereateMealByTitle() {
		const check = confirm(CONFIRM_MESSAGES.title_to_dish);
		if (!check) {
			exitEdit();
			return;
		}

		const title = document.querySelector(`[data-title="${dish.label}"]`) as HTMLElement;
		if (!title) return;

		const titleText = title.textContent;
		if (!titleText) return;

		try {
			isLoading = true;

			const res = await generate('/api/generate-by-title', { suggested_title: titleText });
			$Menus = $Menus.map((menu: DayType) => {
				if (menu.week_day.toLocaleLowerCase() === $CurrentDay) menu[type] = res;
				return menu;
			});

			exitEdit(false);
			setTimeout(() => generateRecipe(false));
		} catch {
			anounceError();
			exitEdit();
			console.log(`Error generating ${titleText}`);
		}

		isLoading = false;
	}
</script>

<Dialog bind:open>
	<article
		class="mx-auto flex size-full max-w-4xl flex-col items-start gap-8 overflow-y-auto overflow-x-hidden overscroll-contain px-6 pb-24 pt-16 lg:p-16 lg:pb-32"
	>
		<header class="flex flex-col items-start gap-4">
			<Heading title={dish.label}>{dish.label}</Heading>

			<Text class="flex items-center gap-1 text-xs uppercase text-neutral-400">
				<Time class="size-5" />
				{!Number(dish.time_to_prepare) ? dish.time_to_prepare : `${dish.time_to_prepare} minutos`}
			</Text>

			{#if isLoading}
				<Button class="flex items-center gap-1 px-4 py-2 text-sm font-semibold">
					{#if isError}
						<span class="flex items-center justify-center gap-1 text-xs text-red-400">
							<Error class="size-5" />
							Error
						</span>
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
			{:else if !editingTitle}
				<Button
					class="flex items-center gap-1 py-2 pl-3 pr-4 text-sm font-semibold"
					click={editTitle}
				>
					<Ai class="size-5" />
					Sugerir
				</Button>
			{:else}
				<div class="flex items-center gap-2">
					<Button
						class="flex items-center gap-1 py-2 pl-3 pr-4 text-sm font-semibold"
						click={genereateMealByTitle}
					>
						<Ai class="size-5" />
						Generar
					</Button>
					<Button class="flex items-center gap-1 px-3 py-2 text-sm font-semibold" click={exitEdit}>
						Cancelar
					</Button>
				</div>
			{/if}
		</header>

		<main class="flex w-full flex-col gap-4">
			<div>
				<Heading as="h3" class="flex items-center justify-between text-xl">
					Ingredientes
					<Price>{dish.approximate_price_euros}</Price>
				</Heading>
			</div>

			{#if dish?.ingredients}
				<ul class="flex w-full flex-wrap gap-1">
					{#each dish.ingredients as ingredient}
						<li class="flex flex-col gap-2">
							<Box class="flex h-full items-center justify-between gap-4 px-4 py-2">
								<Text class="first-letter:uppercase">{formatIngredient(ingredient)}</Text>
							</Box>
						</li>
					{/each}
				</ul>
			{/if}
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
