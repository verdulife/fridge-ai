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

<article class="flex w-full max-w-md flex-col items-center justify-center gap-12">
	<div class="flex flex-col justify-center gap-4">
		<Heading
			>Tus <span class="text-vista-300">alergias</span>,
			<span class="text-vista-300">intolerancias</span> o
			<span class="text-vista-300">preferencias</span>
		</Heading>

		<div class="flex flex-wrap items-start justify-start gap-1">
			{#each allergens_options as allergen}
				<Checkbox bind:checked={allergensSelection[allergen.id]}>
					{allergen.name}
				</Checkbox>
			{/each}
		</div>
	</div>

	<Link href="/tour/step-4" class="w-2/3 border border-neutral-200">SIGUIENTE</Link>
</article>
