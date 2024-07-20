<script>
	import Heading from '@/components/ui/Heading.svelte';
	import Text from '@/components/ui/Text.svelte';

	export let message;
</script>

<article class="flex size-full flex-col items-center justify-center">
	<div class="flex w-full flex-col items-center justify-center gap-4 text-center">
		<Heading as="h1">Eso es todo</Heading>

		<Text>{message}</Text>
	</div>
</article>
