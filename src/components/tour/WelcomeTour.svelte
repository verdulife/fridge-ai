<script>
	import Heading from '@/components/ui/Heading.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Button from '@/components/ui/Button.svelte';

	export let nextTour;
</script>

<article class="flex size-full flex-col items-center justify-center gap-12">
	<div class="flex w-full max-w-md flex-col items-center justify-center gap-4 text-center">
		<Heading as="h1">hola, soy tu nevera digital inteligente</Heading>

		<Text>
			Olvídate para siempre lo que cocinar, si lo que cocinas es sano y equilibrado y si te hace
			falta comprar algo en el super.
		</Text>

		<Text>
			Menú semanal, macronutrientes, kilocalorías, la lista de la compra, aquí lo tienes todo y
			gratuito.
		</Text>
	</div>

	<Button class="w-1/2 md:w-1/5" brand click={nextTour}>EMPEZAR</Button>
</article>
