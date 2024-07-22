<script lang="ts">
	import { UserPreferences } from '@/lib/stores';
	import { MINIMUM_LIKE_OR_DISLIKE } from '@/lib/consts';

	import Heading from '@/components/ui/Heading.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Input from '@/components/ui/Input.svelte';
	import Link from '@/components/ui/Link.svelte';

	$: requiredDislike = $UserPreferences.dislike.length === MINIMUM_LIKE_OR_DISLIKE;
</script>

<article class="flex w-full max-w-sm flex-col items-center justify-center gap-12">
	<div class="flex flex-col justify-center gap-4">
		<Heading>
			Ingredientes que <span class="text-vista-300">detestes</span>
		</Heading>
		<Text>Más adelante podrás ampliar esta lista</Text>

		<Input bind:value={$UserPreferences.dislike[0]} placeholder="Primer ingrediente" />
		<Input bind:value={$UserPreferences.dislike[1]} placeholder="Segundo ingrediente" />
		<Input bind:value={$UserPreferences.dislike[2]} placeholder="Tercer ingrediente" />
		<Input bind:value={$UserPreferences.dislike[3]} placeholder="Cuarto ingrediente" />
	</div>

	{#if requiredDislike}
		<Link href="/tour/step-3" class="w-2/3 border border-neutral-200">SIGUIENTE</Link>
	{/if}
</article>
