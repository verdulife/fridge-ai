<script>
	import { UiPreferences } from '@/lib/stores';

	import Heading from '@/components/ui/Heading.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Link from '@/components/ui/Link.svelte';
	import Radio from '@/components/ui/Radio.svelte';
	import Sun from '@/assets/Sun.svelte';
	import Moon from '@/assets/Moon.svelte';
</script>

<div class="flex flex-col gap-4">
	<Heading as="h1">Tu <span class="text-vista-300">nevera</span> virtual esta aquí</Heading>

	<Text class="text-lg">
		Con fridge ai, tendrás tu menu semanal personalizado, alternativas para no aburrirte y la lista
		de la compra en un solo lugar.
	</Text>

	<Text class="text-lg">
		Y si te preocupa tu nutrición, todos los menús tienen en cuenta tus datos para ser lo más
		equilibrados y sanos para ti.
	</Text>

	<div class="mt-4 flex items-center gap-1 lg:mt-8">
		<Radio
			bind:group={$UiPreferences.dark_mode}
			value={false}
			class="flex items-center lg:gap-1 pl-3 pr-4"
		>
			<Sun class="h-4 w-4" />
			Modo claro
		</Radio>
		<Radio
			bind:group={$UiPreferences.dark_mode}
			value={true}
			class="flex items-center lg:gap-1 pl-3 pr-4"
		>
			<Moon class="h-4 w-4" />
			Modo oscuro
		</Radio>
	</div>
</div>

<Link
	href="/tour/step-1"
	class="!hover:text-neutral-50 fixed bottom-16 w-2/3 max-w-64 bg-vista-300 px-6 py-3 text-neutral-800 hover:bg-vista-400 dark:bg-vista-300"
	brand
>
	EMPEZAR
</Link>
