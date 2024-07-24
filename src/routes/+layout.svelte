<script lang="ts">
	import '@/app.css';

	import { onNavigate } from '$app/navigation';
	import { title, description, url } from '@/lib/metadata';
	import { page } from '$app/stores';
	import { Toaster } from 'svelte-french-toast';
	import { UiPreferences } from '@/lib/stores';
	import { browser } from '$app/environment';

	import Background from '@/components/Background.svelte';
	import Header from '@/components/Header.svelte';
	import Nav from '@/components/Nav.svelte';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	function switchDarkMode() {
		if (!browser) return;

		$UiPreferences.dark_mode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}

	$: notTour = !$page.url.pathname.includes('tour');
	$: $UiPreferences, switchDarkMode();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="apple-mobile-web-app-title" content={title} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image:alt" content={title} />
</svelte:head>

<Background />

<main
	class="mx-auto min-h-screen flex max-w-6xl flex-col items-center text-pretty border-x border-neutral-300 bg-neutral-100 shadow-2xl shadow-neutral-300 dark:border-neutral-700/40 dark:bg-neutral-950 dark:shadow-black"
>
	<Header />
	<div class="relative w-full">
		<slot />
	</div>

	{#if notTour}
		<Nav />
	{/if}
</main>

<Toaster />
