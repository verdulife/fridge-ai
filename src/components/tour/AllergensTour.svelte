<script lang="ts">
	import { UserPreferences } from '@/lib/stores';
	import { allergens_options } from '@/lib/consts';

	import Heading from '@/components/ui/Heading.svelte';
	import Checkbox from '@/components/ui/Checkbox.svelte';
	import Button from '@/components/ui/Button.svelte';

	export let nextTour;
	let currenSelection = $UserPreferences.allergens;

	$: allergensSelection = allergens_options.reduce(
		(acc, allergen) => {
			acc[allergen.id] = currenSelection.includes(allergen.id);
			return acc;
		},
		{} as { [key: string]: boolean }
	);

	$: allergensSelection,
		($UserPreferences.allergens = Object.keys(allergensSelection).filter(
			(key) => allergensSelection[key]
		));
</script>

<article class="flex size-full flex-col items-center justify-center gap-12">
	<div class="flex max-w-md flex-col justify-center gap-4">
		<Heading
			>Si tienes alguna <span class="text-vista-300">alergia</span> o
			<span class="text-vista-300">intolerancia</span> márcalas aquí</Heading
		>

		<div class="flex flex-wrap items-start justify-start gap-1">
			{#each allergens_options as allergen}
				<Checkbox bind:checked={allergensSelection[allergen.id]}>
					{allergen.name}
				</Checkbox>
			{/each}
		</div>
	</div>

	<Button class="w-1/2 md:w-1/5" click={nextTour}>SIGUIENTE</Button>
</article>
