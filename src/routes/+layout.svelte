<script lang="ts">
	import '@/app.css';

	import { onNavigate } from '$app/navigation';
	import { title, description, url } from '@/lib/metadata';
	import { page } from '$app/stores';

	import Header from '@/components/Header.svelte';
	import Nav from '@/components/Nav.svelte';
	import Blobs from '@/components/Blobs.svelte';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	$: notTour = !$page.url.pathname.includes('tour');
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

<Blobs />

<main
	class="mx-auto flex min-h-screen max-w-6xl flex-col items-center border-x border-neutral-300 bg-neutral-100/70 shadow-2xl shadow-neutral-300 dark:border-neutral-800 dark:bg-neutral-950/90 dark:shadow-black"
>
	<Header />
	<div class="mt-24 w-full">
		<slot />
	</div>

	{#if notTour}
		<Nav />
	{/if}
</main>
