<script lang="ts">
	import { goto } from '$app/navigation';
	import { UserPreferences } from '@/lib/stores';

	import Heading from '@/components/ui/Heading.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Input from '@/components/ui/Input.svelte';
	import Button from '@/components/ui/Button.svelte';

	function nextStep() {
		goto('/tour/step-3');
	}
</script>

<article class="flex w-full max-w-sm flex-col items-center">
	<form class="flex flex-col items-center justify-center gap-4" on:submit|preventDefault={nextStep}>
		<Heading class="w-full">
			Ingredientes que <span class="text-vista-300">detestes</span>
		</Heading>
		<Text class="w-full">Más adelante podrás ampliar esta lista</Text>

		<Input bind:value={$UserPreferences.dislike[0]} placeholder="Primer ingrediente" />
		<Input bind:value={$UserPreferences.dislike[1]} placeholder="Segundo ingrediente" />
		<Input bind:value={$UserPreferences.dislike[2]} placeholder="Tercer ingrediente" />
		<Input bind:value={$UserPreferences.dislike[3]} placeholder="Cuarto ingrediente" />

		<Button class="fixed bottom-4 w-2/3 max-w-64 px-6 py-3 lg:bottom-8">SIGUIENTE</Button>
	</form>
</article>
