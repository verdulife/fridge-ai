<script lang="ts">
	import { UserPreferences } from '@/lib/stores';

	import Heading from '@/components/ui/Heading.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Input from '@/components/ui/Input.svelte';
	import IconButton from '@/components/ui/IconButton.svelte';
	import Plus from '@/assets/Plus.svelte';
	import Minus from '@/assets/Minus.svelte';

	export let nextTour;

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
</script>

<article class="flex w-full max-w-sm flex-col items-center justify-center gap-12">
	<div class="flex flex-col justify-center gap-4">
		<Heading>Tus <span class="text-vista-300">cifras</span></Heading>

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
	</div>

	<Button class="w-2/3 border border-neutral-200" click={nextTour}>SIGUIENTE</Button>
</article>
