<script>
	import { UI_COLORS } from '@/lib/consts';
	import { UiPreferences } from '@/lib/stores';

	import Dialog from '@/components/ui/Dialog.svelte';
	import Heading from './ui/Heading.svelte';
	import Text from './ui/Text.svelte';
	import Button from './ui/Button.svelte';
	import Ai from '@/assets/Ai.svelte';

	export let open = false;
	let isLoading = false;

	function generateEvaluation() {
		isLoading = true;
	}
</script>

<Dialog bind:open>
	<article
		class="mx-auto flex size-full max-w-4xl flex-col items-start gap-8 overflow-y-auto overflow-x-hidden overscroll-contain px-6 pb-24 pt-16 lg:p-16 lg:pb-32"
	>
		<header class="flex flex-col items-start gap-4">
			<Heading>Tu menú semanal</Heading>

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
				<div class="size-32 bg-vista-300 flex items-center justify-center rounded-full">
					<div class="flex flex-col items-center justify-center bg-neutral-900 size-28 rounded-full">
						<Heading as="h3" class="">55</Heading>
						<Text class="text-neutral-400">Calidad</Text>
					</div>
				</div>


				<div class="flex items-center gap-2">
					<Button
						class="flex items-center gap-1 py-2 pl-3 pr-4 text-sm font-semibold"
						click={generateEvaluation}
					>
						<Ai class="size-5" />
						Reevaluar
					</Button>
				</div>
			{/if}
		</header>
	</article>
</Dialog>

<style>
	article {
		scrollbar-width: none;
	}
</style>
