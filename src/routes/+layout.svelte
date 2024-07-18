<script>
	import '@/app.css';
</script>

<svelte:head>
	<title>Fridge AI 🍽️</title>
</svelte:head>

<main class="flex h-screen flex-col items-center overflow-x-hidden bg-neutral-950 text-neutral-300">
	<header class="flex w-full justify-center border-b border-neutral-800 p-4 text-center">
		<h1 class="text-xl font-bold">Fridge AI 🍽️</h1>
	</header>

	<div class="flex w-full flex-1 flex-col items-center justify-center p-4">
		<slot />
	</div>
</main>
