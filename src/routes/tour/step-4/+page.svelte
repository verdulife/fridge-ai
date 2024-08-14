<script lang="ts">
	import { UserPreferences } from '@/lib/stores';
	import { MAX_BODY_VALUE, USER_INFO_LIB } from '@/lib/consts';

	import Heading from '@/components/ui/Heading.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Plus from '@/assets/Plus.svelte';
	import Minus from '@/assets/Minus.svelte';
	import Link from '@/components/ui/Link.svelte';

	function subtract(key: string) {
		const value = parseFloat($UserPreferences.info[key]);
		if (value < 1) return;
		$UserPreferences.info[key] = value - 1 + ` ${USER_INFO_LIB[key]}`;
	}

	function add(key: string) {
		const value = parseFloat($UserPreferences.info[key]);
		if (value > MAX_BODY_VALUE) return;
		$UserPreferences.info[key] = value + 1 + ` ${USER_INFO_LIB[key]}`;
	}
</script>

<div class="flex w-full flex-col gap-4">
	<Heading>Tu y tu <span class="text-vista-300">cuerpo</span></Heading>

	<div class="flex w-full flex-col gap-2">
		<Text>Edad</Text>
		<div class="flex items-center justify-between gap-1">
			<Heading class="text-2xl">{$UserPreferences.info.age}</Heading>

			<div>
				<Button click={() => subtract('age')} class="px-4 py-2">
					<Minus class="size-4" />
				</Button>
				<Button click={() => add('age')} class="px-4 py-2">
					<Plus class="size-4" />
				</Button>
			</div>
		</div>
	</div>

	<hr class="border-neutral-700/20" />

	<div class="flex w-full flex-col gap-2">
		<Text>Altura</Text>
		<div class="flex items-center justify-between gap-1">
			<Heading class="text-2xl">{$UserPreferences.info.height}</Heading>

			<div>
				<Button click={() => subtract('height')} class="px-4 py-2">
					<Minus class="size-4" />
				</Button>
				<Button click={() => add('height')} class="px-4 py-2">
					<Plus class="size-4" />
				</Button>
			</div>
		</div>
	</div>

	<hr class="border-neutral-700/20" />

	<div class="flex w-full flex-col gap-2">
		<Text>Peso</Text>
		<div class="flex items-center justify-between gap-1">
			<Heading class="text-2xl">{$UserPreferences.info.weight}</Heading>

			<div>
				<Button click={() => subtract('weight')} class="px-4 py-2">
					<Minus class="size-4" />
				</Button>
				<Button click={() => add('weight')} class="px-4 py-2">
					<Plus class="size-4" />
				</Button>
			</div>
		</div>
	</div>
</div>

<Link href="/tour/step-5" class="fixed bottom-14 w-2/3 max-w-64 px-6 py-3">SIGUIENTE</Link>
