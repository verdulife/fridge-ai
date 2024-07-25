<script>
	import Heading from '@/components/ui/Heading.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Link from '@/components/ui/Link.svelte';
</script>

<div class="flex flex-col gap-4">
	<Heading as="h1">Tu <span class="text-vista-300">nevera</span> virtual esta aquí</Heading>

	<Text class="text-lg">
		Con fridge ai, tendrás tu menu semanal personalizado, alternativas para no aburrirte y la lista
		de la compra en un solo lugar.
	</Text>

	<Text class="text-lg">
		Y si te preocupa tu nutricion, todos los menus tiene en cuenta tus datos para ser lo mas
		equilibrados posible.
	</Text>
</div>

<Link
	href="/tour/step-1"
	class="fixed bottom-16 w-2/3 max-w-64 bg-vista-300 px-6 py-3 !text-neutral-50 hover:bg-vista-400 !hover:text-neutral-50"
	brand
>
	EMPEZAR
</Link>
