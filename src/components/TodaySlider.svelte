<script lang="ts">
	import Text from '@/components/ui/Text.svelte';
	import DishCard from '@/components/DishCard.svelte';

	export let data;
</script>

<section class="flex w-full flex-col items-start gap-4">
	<div class="px-8 lg:px-16">
		<Text>Tu menú del día</Text>
	</div>

	<ul
		class="flex w-full items-stretch snap-x snap-mandatory scroll-p-8 gap-4 overflow-x-auto px-8 lg:scroll-p-16 lg:px-16"
	>
		<li class="w-full max-w-xs shrink-0 snap-start">
			<DishCard dish={data.breakfast}>DESAYUNO</DishCard>
		</li>
		<li class="w-full max-w-xs shrink-0 snap-start">
			<DishCard dish={data.lunch}>COMIDA</DishCard>
		</li>
		<li class="w-full max-w-xs shrink-0 snap-start">
			<DishCard dish={data.dinner}>CENA</DishCard>
		</li>
	</ul>
</section>

<style>
	ul {
		scrollbar-width: none;
	}
</style>
