<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Menus, UserPreferences } from '@/lib/stores';
	import { AWAITING_RESPONSES } from '@/lib/consts';

	import EndTour from '@/components/tour/EndTour.svelte';
	let message: string = AWAITING_RESPONSES[0];

	function simulateProcessing() {
		setInterval(() => {
			const index = Math.floor(Math.random() * AWAITING_RESPONSES.length);
			message = AWAITING_RESPONSES[index];
		}, 2000);
	}

	function resetTour() {
		alert('Error al generar menús. Intenta nuevamente.');
		goto('/tour');
	}

	async function generateMenus() {
		const res = await fetch('/api/generate-menus', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user_preferences: $UserPreferences })
		});

		if (!res.ok) resetTour();
		const data = await res.json();

		if (!JSON.parse(data)) resetTour();
		$Menus = JSON.parse(data);
		goto('/');
	}

	onMount(async () => {
		simulateProcessing();
		if ($Menus.length === 0) await generateMenus();
		else goto('/tour');
	});
</script>

<section class="size-full p-8">
	<EndTour {message} />
</section>
