<script>
	import Heading from '@/components/ui/Heading.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Input from '@/components/ui/Input.svelte';
	import IconButton from '@/components/ui/IconButton.svelte';
	import Plus from '@/assets/Plus.svelte';
	import Minus from '@/assets/Minus.svelte';
	import Radio from '../ui/Radio.svelte';

	import { exercise } from '@/lib/exercise';

	export let nextTour;
	let exerciseSelection = {
		none: false,
		bit: false,
		medium: false,
		constant: false,
		full: false
	};
</script>

<article class="flex size-full flex-col items-center justify-center gap-12">
	<div class="flex flex-col justify-center gap-4">
		<Heading>Por último, háblame un poco de ti</Heading>

		<Text>Cuanto mides</Text>
		<div class="flex gap-4">
			<Input type="number" placeholder="1,74cm" />
			<IconButton><Plus /></IconButton>
			<IconButton><Minus /></IconButton>
		</div>

		<Text>Cuanto pesas</Text>
		<div class="flex gap-4">
			<Input type="number" placeholder="1,74kg" />
			<IconButton><Plus /></IconButton>
			<IconButton><Minus /></IconButton>
		</div>

		<Text>Cuantas veces haces ejercicio a la semana</Text>
		<div class="flex flex-wrap items-start justify-start gap-1">
			{#each exercise as exercise}
				<Radio group="exercise" value={exerciseSelection[exercise.id]}>
					{exercise.name}
				</Radio>
			{/each}
		</div>
	</div>

	<Button class="w-1/2 md:w-1/5" {nextTour}>SIGUIENTE</Button>
</article>
