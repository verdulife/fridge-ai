<script lang="ts">
	import { UserPreferences } from '@/lib/stores';
	import { USER_INFO_LIB } from '@/lib/consts';

	import Heading from '@/components/ui/Heading.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Plus from '@/assets/Plus.svelte';
	import Minus from '@/assets/Minus.svelte';
	import Link from '@/components/ui/Link.svelte';

	function subtractFive(key: string) {
		$UserPreferences.info[key] =
			parseFloat($UserPreferences.info[key]) - 5 + ` ${USER_INFO_LIB[key]}`;
	}
	function addFive(key: string) {
		$UserPreferences.info[key] =
			parseFloat($UserPreferences.info[key]) + 5 + ` ${USER_INFO_LIB[key]}`;
	}

	function subtract(key: string) {
		$UserPreferences.info[key] =
			parseFloat($UserPreferences.info[key]) - 1 + ` ${USER_INFO_LIB[key]}`;
	}

	function add(key: string) {
		$UserPreferences.info[key] =
			parseFloat($UserPreferences.info[key]) + 1 + ` ${USER_INFO_LIB[key]}`;
	}
</script>

<article class="flex w-full max-w-sm flex-col items-center justify-center gap-12">
	<div class="flex w-full flex-col justify-center gap-8">
		<Heading>Tus <span class="text-vista-300">cifras</span></Heading>

		<div class="flex flex-col gap-2">
			<Text>Cuantos años tienes</Text>
			<div class="flex items-center gap-1">
				<Button click={() => subtractFive('age')} class="flex h-full items-center px-4 py-2">
					<Minus class="size-4" />5
				</Button>
				<Button click={() => subtract('age')} class="h-full px-4 py-2"
					><Minus class="size-4" /></Button
				>

				<Heading class="grow text-center text-xl">{$UserPreferences.info.age}</Heading>

				<Button click={() => add('age')} class="h-full px-4 py-2"><Plus class="size-4" /></Button>
				<Button click={() => addFive('age')} class="flex h-full items-center px-4 py-2">
					<Plus class="size-4" />5
				</Button>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<Text>Cuanto mides</Text>
			<div class="flex items-center gap-1">
				<Button click={() => subtractFive('height')} class="flex h-full items-center px-4 py-2">
					<Minus class="size-4" />5
				</Button>
				<Button click={() => subtract('height')} class="h-full px-4 py-2"
					><Minus class="size-4" /></Button
				>

				<Heading class="grow text-center text-xl">{$UserPreferences.info.height}</Heading>

				<Button click={() => add('height')} class="h-full px-4 py-2"><Plus class="size-4" /></Button
				>
				<Button click={() => addFive('height')} class="flex h-full items-center px-4 py-2">
					<Plus class="size-4" />5
				</Button>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<Text>Cuanto pesas</Text>
			<div class="flex items-center gap-1">
				<Button click={() => subtractFive('weight')} class="flex h-full items-center px-4 py-2">
					<Minus class="size-4" />5
				</Button>
				<Button click={() => subtract('weight')} class="h-full px-4 py-2"
					><Minus class="size-4" /></Button
				>

				<Heading class="grow text-center text-xl">{$UserPreferences.info.weight}</Heading>

				<Button click={() => add('weight')} class="h-full px-4 py-2"><Plus class="size-4" /></Button
				>
				<Button click={() => addFive('weight')} class="flex h-full items-center px-4 py-2">
					<Plus class="size-4" />5
				</Button>
			</div>
		</div>
	</div>

	<Link href="/tour/step-5" class="fixed bottom-4 lg:bottom-8 max-w-64 w-2/3 px-6 py-3">SIGUIENTE</Link>
</article>
