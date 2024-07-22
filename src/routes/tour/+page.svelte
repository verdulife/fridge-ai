<script>
	import Heading from '@/components/ui/Heading.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Link from '@/components/ui/Link.svelte';
</script>

<article class="flex w-full max-w-sm flex-col items-center justify-center gap-12">
	<div class="flex w-full flex-col items-center gap-4 text-center">
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

	<Link href="/tour/step-1" class="w-2/3" brand>EMPEZAR</Link>
</article>
