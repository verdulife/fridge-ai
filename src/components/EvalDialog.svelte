<script>
	import { UI_COLORS } from '@/lib/consts';
	import { EvalMenus, UiPreferences, UserPreferences } from '@/lib/stores';
	import { generate, onlyMenuTitles } from '@/lib/utils';

	import Dialog from '@/components/ui/Dialog.svelte';
	import Heading from './ui/Heading.svelte';
	import Text from './ui/Text.svelte';
	import Button from './ui/Button.svelte';
	import Ai from '@/assets/Ai.svelte';
	import EvalDisc from './EvalDisc.svelte';

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

				<main class="flex flex-wrap gap-2">
					<EvalDisc score={$EvalMenus.score}>Calidad</EvalDisc>
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
