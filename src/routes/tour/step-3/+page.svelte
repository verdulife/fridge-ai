<script lang="ts">
	import { UserPreferences } from '@/lib/stores';
	import {
		allergens_options,
		average_cost_options,
		average_preparation_options
	} from '@/lib/consts';

	import Heading from '@/components/ui/Heading.svelte';
	import Link from '@/components/ui/Link.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Radio from '@/components/ui/Radio.svelte';
	import Time from '@/assets/Time.svelte';

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

<div class="flex flex-col justify-center gap-2">
	<Heading>
		Tiempo de <span class="text-vista-300">preparación</span>
	</Heading>
	<Text class="text-neutral-400">Elige el tiempo medio de preparación de tus platos.</Text>

	<div class="mt-4 flex flex-wrap gap-1">
		{#each average_preparation_options as average}
			<Radio
				bind:group={$UserPreferences.average_preparation_time_per_dish}
				value={average.id}
				class="flex items-center gap-1 pl-3 pr-4"
			>
				<Time class="h-4 w-4" />
				{average.name}
			</Radio>
		{/each}
	</div>

	<Heading class="mt-4">
		Precio por <span class="text-vista-300">plato</span>
	</Heading>
	<Text class="text-neutral-400">Elige el precio medio de la receta por plato.</Text>

	<div class="mt-4 flex flex-wrap gap-1">
		{#each average_cost_options as average}
			<Radio
				bind:group={$UserPreferences.average_cost_per_dish}
				value={average.id}
				class="flex items-center gap-1 pl-3 pr-4"
			>
				<Time class="h-4 w-4" />
				{average.name}
			</Radio>
		{/each}
	</div>
</div>

<Link href="/tour/step-4" class="fixed bottom-16 w-2/3 max-w-64 px-6 py-3">SIGUIENTE</Link>
