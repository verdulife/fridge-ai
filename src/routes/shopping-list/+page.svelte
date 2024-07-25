<script lang="ts">
	import type { DayType } from '@/lib/types';

	import { Menus, UserPreferences } from '@/lib/stores';
	import { WEEK_DAYS } from '@/lib/consts';
	import { setDislike, setLike } from '@/lib/utils';

	import Text from '@/components/ui/Text.svelte';
	import Heading from '@/components/ui/Heading.svelte';
	import Box from '@/components/ui/Box.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Like from '@/assets/Like.svelte';
	import Dislike from '@/assets/Dislike.svelte';

	const monday_menu = $Menus.find((menu: DayType) => menu.week_day.toLocaleLowerCase() === 'lunes');
	const tuesday_menu = $Menus.find(
		(menu: DayType) => menu.week_day.toLocaleLowerCase() === 'martes'
	);
	const wednesday_menu = $Menus.find(
		(menu: DayType) => menu.week_day.toLocaleLowerCase() === 'miércoles'
	);
	const thursday_menu = $Menus.find(
		(menu: DayType) => menu.week_day.toLocaleLowerCase() === 'jueves'
	);
	const friday_menu = $Menus.find(
		(menu: DayType) => menu.week_day.toLocaleLowerCase() === 'viernes'
	);
	const saturday_menu = $Menus.find(
		(menu: DayType) => menu.week_day.toLocaleLowerCase() === 'sábado'
	);
	const sunday_menu = $Menus.find(
		(menu: DayType) => menu.week_day.toLocaleLowerCase() === 'domingo'
	);

	const week_menus = [
		monday_menu,
		tuesday_menu,
		wednesday_menu,
		thursday_menu,
		friday_menu,
		saturday_menu,
		sunday_menu
	];
</script>

<div class="flex w-full flex-col items-start gap-8 p-4 lg:p-8">
	<Heading as="h1" class="text-4xl font-bold">Tu lista de la compra</Heading>

	{#each week_menus as menu, index}
		<section class="flex w-full flex-col gap-4">
			<Text class="font-semibold">{WEEK_DAYS[index]}</Text>

			{#if menu}
				<ul class="grid grid-cols-1 gap-1 lg:grid-cols-2">
					{#each menu.breakfast[0].menu_ingredients as ingredient}
						<li class="flex w-full flex-col gap-2">
							<Box class="flex h-full items-center justify-between gap-4 p-4">
								<Text class="first-letter:uppercase">{ingredient}</Text>

								<aside class="flex items-center gap-2">
									{#if !$UserPreferences.like.includes(ingredient)}
										<Button class="px-3 py-1" click={() => setLike(ingredient)}>
											<Like class="size-5" />
										</Button>
									{/if}

									{#if !$UserPreferences.dislike.includes(ingredient)}
										<Button class="px-3 py-1" click={() => setDislike(ingredient)}>
											<Dislike class="size-5" />
										</Button>
									{/if}
								</aside>
							</Box>
						</li>
					{/each}
				</ul>
			{/if}
		</section>
	{/each}
</div>
