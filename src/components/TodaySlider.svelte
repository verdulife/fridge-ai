<script lang="ts">
	import Text from '@/components/ui/Text.svelte';
	import DishCard from '@/components/DishCard.svelte';

	export let data;
</script>

<section class="flex w-full flex-col items-start gap-4">
	<div class="px-4 lg:px-8">
		<Text>Tu menú del día</Text>
	</div>

	<ul
		class="flex w-full snap-x snap-mandatory scroll-p-4 items-stretch gap-2 overflow-x-auto px-4 lg:scroll-p-8 lg:px-8"
	>
		<li class="shrink-0 snap-start">
			<DishCard dish={data.breakfast}>DESAYUNO</DishCard>
		</li>
		<li class="shrink-0 snap-start">
			<DishCard dish={data.lunch}>COMIDA</DishCard>
		</li>
		<li class="shrink-0 snap-start">
			<DishCard dish={data.dinner}>CENA</DishCard>
		</li>
	</ul>
</section>

<style>
	ul {
		scrollbar-width: none;
	}
</style>
