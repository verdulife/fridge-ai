<script>
	import Heading from '@/components/ui/Heading.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Input from '../ui/Input.svelte';

	export let nextTour;
</script>

<article class="flex size-full flex-col items-center justify-center gap-12">
	<div class="flex flex-col justify-center gap-4">
		<Heading>Dime 4 platos o ingredientes que <span class="text-vista-300">detestes</span></Heading>
		<Text>Más adelante podrás ampliar esta lista</Text>

		<Input placeholder="1er ingrediente o plato" />
		<Input placeholder="2er ingrediente o plato" />
		<Input placeholder="3er ingrediente o plato" />
		<Input placeholder="4er ingrediente o plato" />
	</div>

	<Button class="w-1/2 md:w-1/5" {nextTour}>SIGUIENTE</Button>
</article>
