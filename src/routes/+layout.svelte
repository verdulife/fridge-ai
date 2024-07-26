<script lang="ts">
	import '@/app.css';
	import 'groupby-polyfill/lib/polyfill.js';

	import { onNavigate } from '$app/navigation';
	import { title, description, url } from '@/lib/metadata';
	import { page } from '$app/stores';
	import { Toaster } from 'svelte-french-toast';
	import { UiPreferences } from '@/lib/stores';
	import { browser } from '$app/environment';
	import { UI_COLORS } from '@/lib/consts';

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

		$UiPreferences.dark_mode
			? document
					.querySelector('meta[name="theme-color"]')
					?.setAttribute('content', UI_COLORS.bg_dark)
			: document
					.querySelector('meta[name="theme-color"]')
					?.setAttribute('content', UI_COLORS.bg_light);
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
	class="mx-auto flex min-h-dvh max-w-6xl flex-col items-center text-pretty border-neutral-300 bg-neutral-100 shadow-2xl shadow-neutral-300 lg:border-x dark:border-neutral-700/40 dark:bg-neutral-950 dark:shadow-black"
>
	<Header />
	<div class={`relative mt-24 w-full ${notTour && 'mb-24 mt-16 lg:mb-0 lg:mt-24'}`}>
		<slot />
	</div>

	{#if notTour}
		<Nav />
	{/if}
</main>

<Toaster />

<style>
	main {
		touch-action: manipulation;
	}
</style>
