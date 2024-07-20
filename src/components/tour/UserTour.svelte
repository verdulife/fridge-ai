<script lang="ts">
	import { UserPreferences } from '@/lib/stores';
	import { gender_options, exercise_options } from '@/lib/consts';
	import { goto } from '$app/navigation';

	import Heading from '@/components/ui/Heading.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Radio from '../ui/Radio.svelte';

	function endTour() {
		goto('/tour/set-cookie');
	}
</script>

<article class="flex w-full max-w-sm flex-col items-center justify-center gap-12">
	<div class="flex flex-col justify-center gap-8">
		<Heading>Y para <span class="text-vista-300">acabar</span></Heading>

		<div class="flex flex-col gap-2">
			<Text>Cuál es tu sexo</Text>
			<div class="flex flex-wrap items-start justify-start gap-1">
				{#each gender_options as gender}
					<Radio bind:group={$UserPreferences.info.gender} value={gender.id}>
						{gender.name}
					</Radio>
				{/each}
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<Text>Cuantas veces haces ejercicio a la semana</Text>
			<div class="flex flex-wrap items-start justify-start gap-1">
				{#each exercise_options as exercise}
					<Radio bind:group={$UserPreferences.info.weekly_exercise} value={exercise.id}>
						{exercise.name}
					</Radio>
				{/each}
			</div>
		</div>
	</div>

	<Button class="w-2/3 border border-neutral-200" click={endTour}>SIGUIENTE</Button>
</article>
