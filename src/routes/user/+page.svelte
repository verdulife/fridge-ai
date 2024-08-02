<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		allergens_options,
		average_preparation_options,
		CONFIRM_MESSAGES,
		exercise_options,
		USER_INFO_LIB,
		MAX_BODY_VALUE,
		average_cost_options
	} from '@/lib/consts';
	import {
		UserPreferences,
		UiPreferences,
		Menus,
		defaultUserPreferences,
		defaultUiPreferences,
		defaultMenus
	} from '@/lib/stores';

	import Radio from '@/components/ui/Radio.svelte';
	import Heading from '@/components/ui/Heading.svelte';
	import Box from '@/components/ui/Box.svelte';
	import Text from '@/components/ui/Text.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Sun from '@/assets/Sun.svelte';
	import Moon from '@/assets/Moon.svelte';
	import Checkbox from '@/components/ui/Checkbox.svelte';
	import Time from '@/assets/Time.svelte';
	import Minus from '@/assets/Minus.svelte';
	import Plus from '@/assets/Plus.svelte';
	import Cohere from '@/assets/Cohere.svelte';

	export let data;
	let currenSelection = $UserPreferences.allergens;
	let custom_api = data.apikey_cookie || '';

	$: allergensSelection = allergens_options.reduce(
		(acc, allergen) => {
			acc[allergen.id] = currenSelection.includes(allergen.id);
			return acc;
		},
		{} as { [key: string]: boolean }
	);

	$: allergensSelection,
		($UserPreferences.allergens = Object.keys(allergensSelection).filter(
			(key) => allergensSelection[key]
		));

	function setApiKey() {
		if (data.apikey_cookie) {
			goto(`/api/set-api-key?delete=true`);
		} else {
			goto(`/api/set-api-key?apiKey=${custom_api}`);
		}
	}

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

	function deleteLocalData() {
		const check = confirm(CONFIRM_MESSAGES.delete_data);
		if (!check) return;

		$UiPreferences = defaultUiPreferences;
		$UserPreferences = defaultUserPreferences;
		$Menus = defaultMenus;
		localStorage.clear();

		goto('/tour?rc=true');
	}
</script>

<div class="mx-auto flex w-full max-w-3xl flex-col items-start gap-2 p-4 lg:p-8">
	<Heading class="!text-2xl font-bold lg:mb-2">Rendimiento</Heading>

	<Box class="flex w-full flex-col items-start p-4">
		<Text class="font-semibold">API Key</Text>
		<Text class="text-sm text-neutral-400">
			Fridge AI utiliza la capa gratuita de la API de Cohere. Para un mejor rendimiento, puedes
			crear tu propia clave API <a
				href="https://dashboard.cohere.com/welcome/login"
				target="_blank"
				class="text-blue-400 underline">aquí</a
			> y añadirla en el campo de abajo.
		</Text>

		<form on:submit|preventDefault={setApiKey} class="w-full">
			<div
				class="mt-4 flex w-full items-center rounded-md border dark:border-neutral-800 dark:bg-neutral-900"
			>
				<Cohere class="h-3 px-3" />
				<input
					type="password"
					bind:value={custom_api}
					class="grow border-l bg-transparent p-3 outline-none dark:border-neutral-800"
				/>
			</div>

			{#if !data?.apikey_cookie}
				<Button class="mt-4 px-6 py-2">Añadir clave API</Button>
			{:else}
				<Button class="mt-4 px-6 py-2">Borrar clave API</Button>
			{/if}
		</form>
	</Box>

	<Heading class="!text-2xl font-bold lg:mb-2">Ajustes visuales</Heading>

	<Box class="flex w-full flex-col p-4">
		<Text class="font-semibold">Tema</Text>
		<Text class="text-sm text-neutral-400">Cambia el modo de color de la aplicación.</Text>

		<div class="mt-4 flex items-center gap-1">
			<Radio
				bind:group={$UiPreferences.dark_mode}
				value={false}
				class="flex items-center pl-3 pr-4 lg:gap-1"
			>
				<Sun class="h-4 w-4" />
				Modo claro
			</Radio>
			<Radio
				bind:group={$UiPreferences.dark_mode}
				value={true}
				class="flex items-center pl-3 pr-4 lg:gap-1"
			>
				<Moon class="h-4 w-4" />
				Modo oscuro
			</Radio>
		</div>
	</Box>

	<Box class="flex w-full flex-col p-4">
		<Text class="font-semibold">Comidas</Text>
		<Text class="text-sm text-neutral-400">Activa o desactiva las comidas que deseas ver.</Text>

		<div class="mt-4 flex flex-col gap-2">
			<div class="flex items-center justify-between gap-1">
				<Text class="text-sm">Desayuno</Text>
				<Checkbox bind:checked={$UiPreferences.show_breakfast} class="text-sm">
					{$UiPreferences.show_breakfast ? 'Visible' : 'Oculto'}
				</Checkbox>
			</div>

			<hr class="border-neutral-700/20" />

			<div class="flex items-center justify-between gap-1">
				<Text class="text-sm">Almuerzo</Text>
				<Checkbox bind:checked={$UiPreferences.show_lunch} class="text-sm">
					{$UiPreferences.show_lunch ? 'Visible' : 'Oculto'}
				</Checkbox>
			</div>

			<hr class="border-neutral-700/20" />

			<div class="flex items-center justify-between gap-1">
				<Text class="text-sm">Cena</Text>
				<Checkbox bind:checked={$UiPreferences.show_dinner} class="text-sm">
					{$UiPreferences.show_dinner ? 'Visible' : 'Oculto'}
				</Checkbox>
			</div>
		</div>
	</Box>

	<Heading class="mt-6 !text-2xl font-bold lg:mb-2">Preferencias</Heading>

	<Box class="flex w-full flex-col p-4">
		<Text class="font-semibold">Tiempo de cocina</Text>
		<Text class="text-sm text-neutral-400">
			Elige el tiempo medio de preparación de tus platos.
		</Text>

		<div class="mt-4 flex flex-wrap gap-1">
			{#each average_preparation_options as average}
				<Radio
					bind:group={$UserPreferences.average_preparation_time_per_dish}
					value={average.id}
					class="flex items-center gap-1 pl-3 pr-4"
				>
					<Time class="h-4 w-4" />
					{average.name}
				</Radio>
			{/each}
		</div>
	</Box>

	<Box class="flex w-full flex-col p-4">
		<Text class="font-semibold">Precio medio por plato</Text>
		<Text class="text-sm text-neutral-400">Elige el precio medio de la receta por plato.</Text>

		<div class="mt-4 flex flex-wrap gap-1">
			{#each average_cost_options as average}
				<Radio
					bind:group={$UserPreferences.average_cost_per_dish}
					value={average.id}
					class="flex items-center gap-1 pl-3 pr-4"
				>
					<Time class="h-4 w-4" />
					{average.name}
				</Radio>
			{/each}
		</div>
	</Box>

	<Box class="flex w-full flex-col p-4">
		<Text class="font-semibold">Alergias o intolerancias</Text>
		<Text class="text-sm text-neutral-400">Activa o desactiva según tus necesidades.</Text>

		<div class="mt-4 flex flex-wrap items-start justify-start gap-1">
			{#each allergens_options as allergen}
				{#if allergen.id !== 'vegano' && allergen.id !== 'vegetariano'}
					<Checkbox bind:checked={allergensSelection[allergen.id]}>
						{allergen.name}
					</Checkbox>
				{/if}
			{/each}
		</div>
	</Box>

	<Box class="flex w-full flex-col p-4">
		<Text class="font-semibold">Preferencias</Text>
		<Text class="text-sm text-neutral-400">Activa o desactiva según tus necesidades.</Text>

		<div class="mt-4 flex flex-wrap items-start justify-start gap-1">
			{#each allergens_options as allergen}
				{#if allergen.id === 'vegano' || allergen.id === 'vegetariano'}
					<Checkbox bind:checked={allergensSelection[allergen.id]}>
						{allergen.name}
					</Checkbox>
				{/if}
			{/each}
		</div>
	</Box>

	<Heading class="mt-6 !text-2xl font-bold lg:mb-2">Tus datos</Heading>

	<Box class="flex w-full flex-col p-4">
		<Text class="font-semibold">Tu cuerpo</Text>
		<Text class="text-sm text-neutral-400">
			Actualiza periódicamente tus datos de peso y altura.
		</Text>

		<div class="mt-4 flex flex-col gap-2">
			<div class="flex w-full flex-col">
				<Text>Peso</Text>
				<div class="flex items-center justify-between">
					<Heading class="!text-2xl">{$UserPreferences.info.weight}</Heading>

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

			<hr class="border-neutral-700/20" />

			<div class="flex w-full flex-col">
				<Text>Altura</Text>
				<div class="flex items-center justify-between">
					<Heading class="!text-2xl">{$UserPreferences.info.height}</Heading>

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
		</div>
	</Box>

	<Box class="flex w-full flex-col items-start gap-4 p-4">
		<Text class="font-semibold">Ejercicio semanal</Text>
		<Text class="text-sm text-neutral-400">
			Define cuánto tiempo le dedicas a hacer ejercicio o deporte semanalmente.
		</Text>

		<div class="mt-4 flex flex-wrap items-start justify-start gap-1">
			{#each exercise_options as exercise}
				<Radio
					bind:group={$UserPreferences.info.weekly_exercise}
					value={exercise.id}
					class="flex items-center gap-1 pl-3 pr-4"
				>
					{exercise.name}
				</Radio>
			{/each}
		</div>
	</Box>

	<Box class="flex w-full flex-col items-start p-4">
		<Text class="font-semibold">Datos y cookies</Text>
		<Text class="text-sm text-neutral-400">Borra tus datos y cookies de la aplicación.</Text>

		<Button
			click={deleteLocalData}
			class="mt-4 gap-2 !border-red-600 !bg-red-200 px-3 py-2 dark:!bg-red-500/20 dark:!text-red-50"
			>Borrar datos y cookies</Button
		>
	</Box>
</div>
