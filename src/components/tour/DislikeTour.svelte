<script lang="ts">
	import { UserPreferences } from '@/lib/stores';
	import { MINIMUM_LIKE_OR_DISLIKE } from '@/lib/consts';

	import Heading from '@/components/ui/Heading.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Input from '@/components/ui/Input.svelte';

	export let nextTour;
	$: requiredDislike = $UserPreferences.dislike.length === MINIMUM_LIKE_OR_DISLIKE;
</script>

<article class="flex size-full flex-col items-center justify-center gap-12">
	<div class="flex flex-col max-w-md justify-center gap-4">
		<Heading>
			Dime 4 platos o ingredientes que <span class="text-vista-300">detestes</span>
		</Heading>
		<Text>Más adelante podrás ampliar esta lista</Text>

		<Input bind:value={$UserPreferences.dislike[0]} placeholder="1er ingrediente o plato" />
		<Input bind:value={$UserPreferences.dislike[1]} placeholder="2er ingrediente o plato" />
		<Input bind:value={$UserPreferences.dislike[2]} placeholder="3er ingrediente o plato" />
		<Input bind:value={$UserPreferences.dislike[3]} placeholder="4er ingrediente o plato" />
	</div>

	{#if requiredDislike}
		<Button class="w-1/2 md:w-1/5" click={nextTour}>SIGUIENTE</Button>
	{/if}
</article>
