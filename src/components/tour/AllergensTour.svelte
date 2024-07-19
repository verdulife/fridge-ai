<script>
	import Heading from '@/components/ui/Heading.svelte';
	import Checkbox from '@/components/ui/Checkbox.svelte';
	import Button from '@/components/ui/Button.svelte';

	import { allergens } from '@/lib/allergens';

	export let nextTour;
	let allergensSelection = {
		crustaceos: false,
		huevos: false,
		pescado: false,
		cacahuetes: false,
		soja: false,
		lacteos: false,
		frutos: false,
		apio: false,
		mostaza: false,
		sesamo: false,
		sulfitos: false,
		moluscos: false,
		altramuces: false,
		gluten: false
	};
</script>

<article class="flex size-full flex-col items-center justify-center gap-12">
	<div class="flex flex-col justify-center gap-4">
		<Heading>Si tienes alguna alergia o intolerancia márcalas aquí</Heading>

		<div class="flex flex-wrap items-start justify-start gap-1">
			{#each allergens as allergen}
				<Checkbox checked={allergensSelection[allergen.id]}>
					{allergen.name}
				</Checkbox>
			{/each}
		</div>
	</div>

	<Button class="w-1/2 md:w-1/5" click={nextTour}>SIGUIENTE</Button>
</article>
