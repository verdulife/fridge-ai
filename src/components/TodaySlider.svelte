<script lang="ts">
	import Text from './ui/Text.svelte';
	import DishCard from './DishCard.svelte';

	export let todayMenu;
</script>

<section class="flex w-full flex-col gap-4">
	<div class="px-8 lg:px-16">
		<Text>Tu menú del día</Text>
	</div>

	{#if todayMenu}
		<ul
			class="flex snap-x snap-mandatory scroll-p-8 gap-4 overflow-x-auto px-8 lg:scroll-p-16 lg:px-16"
		>
			<li class="w-full max-w-sm shrink-0 snap-start">
				<DishCard dish={todayMenu.breakfast}>DESAYUNO</DishCard>
			</li>
			<li class="w-full max-w-sm shrink-0 snap-start">
				<DishCard dish={todayMenu.lunch}>COMIDA</DishCard>
			</li>
			<li class="w-full max-w-sm shrink-0 snap-start">
				<DishCard dish={todayMenu.dinner}>CENA</DishCard>
			</li>
		</ul>
	{/if}
</section>

<style>
	ul {
		scrollbar-width: none;
	}
</style>
