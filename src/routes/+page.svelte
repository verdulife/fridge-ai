<script lang="ts">
	import Today from '@/components/Today.svelte';
	import TodaySlider from '@/components/TodaySlider.svelte';
	import ShoppingList from '@/components/ShoppingList.svelte';
</script>

<main class="flex w-full flex-col gap-8 py-8 lg:py-16 mb-24">
	<Today />
	<TodaySlider />
	<ShoppingList />
</main>
