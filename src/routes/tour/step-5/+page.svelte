<script lang="ts">
	import { UserPreferences } from '@/lib/stores';
	import { gender_options, exercise_options } from '@/lib/consts';

	import Heading from '@/components/ui/Heading.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Radio from '@/components/ui/Radio.svelte';
	import Link from '@/components/ui/Link.svelte';
</script>

<div class="flex flex-col justify-center gap-8">
	<Heading>Y para <span class="text-vista-300">acabar</span></Heading>

	<div class="flex flex-col gap-2">
		<Text>Tu sexo</Text>
		<div class="flex flex-wrap items-start justify-start gap-1">
			{#each gender_options as gender}
				<Radio bind:group={$UserPreferences.info.gender} value={gender.id}>
					{gender.name}
				</Radio>
			{/each}
		</div>
	</div>

	<div class="flex flex-col gap-2">
		<Text>Ejercicio a la semana</Text>
		<div class="flex flex-wrap items-start justify-start gap-1">
			{#each exercise_options as exercise}
				<Radio bind:group={$UserPreferences.info.weekly_exercise} value={exercise.id}>
					{exercise.name}
				</Radio>
			{/each}
		</div>
	</div>
</div>

<Link href="/tour/end" class="fixed bottom-16 w-2/3 max-w-64 px-6 py-3">SIGUIENTE</Link>
