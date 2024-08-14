<script lang="ts">
	import { UserPreferences } from '@/lib/stores';
	import { allergens_options } from '@/lib/consts';

	import Heading from '@/components/ui/Heading.svelte';
	import Checkbox from '@/components/ui/Checkbox.svelte';
	import Link from '@/components/ui/Link.svelte';

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

<div class="flex flex-col justify-center gap-4">
	<Heading>
		Tus <span class="text-vista-300">alergias</span> o
		<span class="text-vista-300">intolerancias</span>
	</Heading>

	<div class="flex flex-wrap items-start justify-start gap-1">
		{#each allergens_options as allergen}
			{#if allergen.id !== 'vegano' && allergen.id !== 'vegetariano'}
				<Checkbox bind:checked={allergensSelection[allergen.id]}>
					{allergen.name}
				</Checkbox>
			{/if}
		{/each}
	</div>

	<Heading>
		Tus <span class="text-vista-300">preferencias</span>
	</Heading>

	<div class="flex flex-wrap items-start justify-start gap-1">
		{#each allergens_options as allergen}
			{#if allergen.id === 'vegano' || allergen.id === 'vegetariano'}
				<Checkbox bind:checked={allergensSelection[allergen.id]}>
					{allergen.name}
				</Checkbox>
			{/if}
		{/each}
	</div>
</div>

<Link href="/tour/step-3" class="fixed bottom-14 w-2/3 max-w-64 px-6 py-3">SIGUIENTE</Link>
