<script lang="ts">
	import type { DayType } from '@/lib/types';
	import { Menus } from '@/lib/stores';
	import { WEEK_DAYS } from '@/lib/consts';

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

<section class="mb-32 flex flex-col gap-8 px-8 lg:px-16">
	<h1 class="text-4xl font-bold">Tus menús</h1>

	{#each week_menus as menu, index}
		<h2 class="text-xl font-bold">{WEEK_DAYS[index]}</h2>
		<ul class="flex flex-col gap-1">
			<li class="flex w-full max-w-xs shrink-0 snap-start">
				<article class="rounded-lg bg-neutral-900 p-4">
					{#if menu}
						<ul>
							{#each menu.breakfast[0].menu_ingredients as item}
								<li>{item}</li>
							{/each}
						</ul>
					{:else}
						<button>Generar menú</button>
					{/if}
				</article>
				<article class="rounded-lg bg-neutral-900 p-4">
					{#if menu}
						<ul>
							{#each menu.dinner[0].menu_ingredients as item}
								<li>{item}</li>
							{/each}
						</ul>
					{:else}
						<button>Generar menú</button>
					{/if}
				</article>
				<article class="rounded-lg bg-neutral-900 p-4">
					{#if menu}
						<ul>
							{#each menu.lunch[0].menu_ingredients as item}
								<li>{item}</li>
							{/each}
						</ul>
					{:else}
						<button>Generar menú</button>
					{/if}
				</article>
			</li>
		</ul>
	{/each}
</section>
