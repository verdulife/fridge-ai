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

		// TODO for await of chunks to fix vercel timeout
		console.log({ res, data });

		/* if (!JSON.parse(data)) resetTour();
		$Menus = JSON.parse(data);
		goto('/'); */
	}

	onMount(async () => {
		simulateProcessing();
		await generateMenus();
	});
</script>

<section class="h-[calc(100vh-96px)] w-full p-8">
	<EndTour {message} />
</section>
