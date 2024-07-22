<script lang="ts">
	import Today from '@/components/Today.svelte';
	import TodaySlider from '@/components/TodaySlider.svelte';
	import ShoppingList from '@/components/ShoppingList.svelte';

	/* async function generateIngridients(dish: string, menuType: string) {
		const res = await fetch('/api/generate-ingridients', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ dish })
		});

		if (!res.ok) return;
		const data = await res.json();

		if (!JSON.parse(data)) return;
		$Menus[todayMenuIndex][menuType][0].menu_items = JSON.parse(data);
	} */

	/* onMount(async () => {
		const breakfastIsFull = todayMenu.breakfast[0].menu_items ?? false;
		const lunchIsFull = todayMenu.lunch[0].menu_items ?? false;
		const dinnerIsFull = todayMenu.dinner[0].menu_items ?? false;

		if (!breakfastIsFull) await generateIngridients(todayMenu.breakfast[0].menu_label, 'breakfast');
		if (!lunchIsFull) await generateIngridients(todayMenu.lunch[0].menu_label, 'lunch');
		if (!dinnerIsFull) await generateIngridients(todayMenu.dinner[0].menu_label, 'dinner');
	}); */
</script>

<main class="flex w-full flex-col gap-8 py-8 lg:py-16">
	<Today />
	<TodaySlider />
	<!-- <ShoppingList /> -->
</main>
