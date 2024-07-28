<script lang="ts">
	import { getCurrentDay } from '@/lib/utils';
	import Heading from '@/components/ui/Heading.svelte';
	import Button from './ui/Button.svelte';
	import Prev from '@/assets/Prev.svelte';
	import Next from '@/assets/Next.svelte';

	export let currentDay: string;

	$: title = currentDay === getCurrentDay() ? `Hoy, ${currentDay}` : currentDay;

	function previousDay() {
		if (currentDay === 'lunes') {
			currentDay = 'domingo';
		} else if (currentDay === 'martes') {
			currentDay = 'lunes';
		} else if (currentDay === 'miércoles') {
			currentDay = 'martes';
		} else if (currentDay === 'jueves') {
			currentDay = 'miércoles';
		} else if (currentDay === 'viernes') {
			currentDay = 'jueves';
		} else if (currentDay === 'sábado') {
			currentDay = 'viernes';
		} else if (currentDay === 'domingo') {
			currentDay = 'sábado';
		}
	}

	function nextDay() {
		if (currentDay === 'lunes') {
			currentDay = 'martes';
		} else if (currentDay === 'martes') {
			currentDay = 'miércoles';
		} else if (currentDay === 'miércoles') {
			currentDay = 'jueves';
		} else if (currentDay === 'jueves') {
			currentDay = 'viernes';
		} else if (currentDay === 'viernes') {
			currentDay = 'sábado';
		} else if (currentDay === 'sábado') {
			currentDay = 'domingo';
		} else if (currentDay === 'domingo') {
			currentDay = 'lunes';
		}
	}
</script>

<section class="flex w-full items-end justify-between px-4 lg:px-8">
	<Heading class="text-3xl first-letter:uppercase">{title}</Heading>

	<nav id="prev_next_days" class="flex gap-2">
		<Button click={previousDay} class="px-3 py-1">
			<Prev />
		</Button>

		<Button click={nextDay} class="px-3 py-1">
			<Next />
		</Button>
	</nav>
</section>
