<script lang="ts">
	import { goto } from '$app/navigation';
	import { UserPreferences } from '@/lib/stores';

	import Heading from '@/components/ui/Heading.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Input from '@/components/ui/Input.svelte';
	import Button from '@/components/ui/Button.svelte';

	function nextStep() {
		goto('/tour/step-2');
	}
</script>

<form class="flex flex-col items-center justify-center gap-2" on:submit|preventDefault={nextStep}>
	<Heading class="w-full">
		Ingredientes que <span class="text-vista-300">no te gustan</span>
	</Heading>
	<Text class="w-full">
		No son obligatorios, pero te ayudarán a generar menús más personalizados.
	</Text>

	<div class="mt-4 flex w-full flex-col gap-2">
		<Input bind:value={$UserPreferences.dislike[0]} placeholder="Primer ingrediente" />
		<Input bind:value={$UserPreferences.dislike[1]} placeholder="Segundo ingrediente" />
		<Input bind:value={$UserPreferences.dislike[2]} placeholder="Tercer ingrediente" />
		<Input bind:value={$UserPreferences.dislike[3]} placeholder="Cuarto ingrediente" />
	</div>

	<Button class="fixed bottom-14 w-2/3 max-w-64 px-6 py-3">SIGUIENTE</Button>
</form>
