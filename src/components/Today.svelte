<script lang="ts">
	import { getCurrentDay } from '@/lib/utils';
	import Heading from '@/components/ui/Heading.svelte';
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

<section class="flex items-center justify-between px-8 lg:px-16">
	<Heading class="text-3xl first-letter:uppercase">{title}</Heading>

	<nav class="flex gap-2">
		<button
			class="flex items-center justify-center rounded-md border border-neutral-300 bg-neutral-100 p-1 dark:border-neutral-600 dark:bg-neutral-800"
			on:click={previousDay}
		>
			<Prev />
		</button>

		<button
			class="flex items-center justify-center rounded-md border border-neutral-300 bg-neutral-100 p-1 dark:border-neutral-600 dark:bg-neutral-800"
			on:click={nextDay}
		>
			<Next />
		</button>
	</nav>
</section>
