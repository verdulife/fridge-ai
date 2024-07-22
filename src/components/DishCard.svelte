<script>
	import Plus from '@/assets/Plus.svelte';
	import Heading from './ui/Heading.svelte';
	import Button from './ui/Button.svelte';
	import Ai from '@/assets/Ai.svelte';

	export let dish;
</script>

<article
	class="flex aspect-[4/3] w-full flex-col items-start gap-4 rounded-xl bg-neutral-900 px-4 py-5"
>
	<header class="flex w-full items-center justify-between">
		<span class="rounded-full bg-neutral-700 px-3 py-1 text-xs font-semibold"><slot /></span>
	</header>

	<Heading as="h3" class="text-xl">{dish[0].menu_label}</Heading>

	<footer class="mt-auto flex w-full items-center">
		<Button class="border border-neutral-200 text-sm">Más info</Button>
		<Button><Ai /> Generar</Button>
	</footer>
</article>
