<script lang="ts">
	import { UserPreferences } from '@/lib/stores';
	import { gender_options, exercise_options } from '@/lib/consts';
	import { goto } from '$app/navigation';

	import Heading from '@/components/ui/Heading.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Input from '@/components/ui/Input.svelte';
	import IconButton from '@/components/ui/IconButton.svelte';
	import Plus from '@/assets/Plus.svelte';
	import Minus from '@/assets/Minus.svelte';
	import Radio from '../ui/Radio.svelte';

	function subtractAge() {
		$UserPreferences.info.age = parseFloat($UserPreferences.info.age) - 1 + ' años';
	}
	function addAge() {
		$UserPreferences.info.age = parseFloat($UserPreferences.info.age) + 1 + ' años';
	}

	function subtractHeight() {
		$UserPreferences.info.height = parseFloat($UserPreferences.info.height) - 1 + ' cm';
	}
	function addHeight() {
		$UserPreferences.info.height = parseFloat($UserPreferences.info.height) + 1 + ' cm';
	}

	function subtractWeight() {
		$UserPreferences.info.weight = parseFloat($UserPreferences.info.weight) - 1 + ' kg';
	}
	function addWeight() {
		$UserPreferences.info.weight = parseFloat($UserPreferences.info.weight) + 1 + ' kg';
	}

	function endTour() {
		goto('/tour/end');
	}
</script>

<article class="flex size-full flex-col items-center justify-center gap-12">
	<div class="flex flex-col max-w-md justify-center gap-4">
		<Heading>Y para <span class="text-vista-300">acabar</span>...</Heading>

		<div class="flex flex-col gap-2">
			<Text>Cuantos años tienes</Text>
			<div class="flex gap-3">
				<IconButton click={subtractAge}><Minus class="size-4" /></IconButton>
				<Input bind:value={$UserPreferences.info.age} placeholder="174cm" readonly />
				<IconButton click={addAge}><Plus class="size-4" /></IconButton>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<Text>Cuanto mides</Text>
			<div class="flex gap-3">
				<IconButton click={subtractHeight}><Minus class="size-4" /></IconButton>
				<Input bind:value={$UserPreferences.info.height} placeholder="174cm" readonly />
				<IconButton click={addHeight}><Plus class="size-4" /></IconButton>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<Text>Cuanto pesas</Text>
			<div class="flex gap-3">
				<IconButton click={subtractWeight}><Minus class="size-4" /></IconButton>
				<Input bind:value={$UserPreferences.info.weight} placeholder="89,5kg" readonly />
				<IconButton click={addWeight}><Plus class="size-4" /></IconButton>
			</div>
		</div>

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

	<Button class="w-1/2 md:w-1/5" click={endTour}>SIGUIENTE</Button>
</article>
