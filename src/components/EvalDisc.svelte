<script>
	import Heading from '@/components/ui/Heading.svelte';
	import Text from '@/components/ui/Text.svelte';

	export let score = 0;
	const value = Math.round((score / 100) * 360) + 'deg';
</script>

<div
	style="--value: {value}"
	class="flex size-28 items-center justify-center rounded-full bg-neutral-800"
>
	<span class="flex size-24 flex-col items-center justify-center rounded-full bg-neutral-900">
		<Heading as="h3" class="text-xl">{score}</Heading>
		<Text class="text-sm text-neutral-400">
			<slot />
		</Text>
	</span>
</div>

<style>
	div {
		background-image: conic-gradient(var(--vista) var(--value), transparent var(--value));
	}
</style>
