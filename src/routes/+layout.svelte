<script>
	import '@/app.css';
	import Header from '@/components/Header.svelte';
	import { title, description, url } from '@/lib/metadata';
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

<main class="min-h-screen bg-[radial-gradient(transparent,#171717_70%)]">
	<Header />

	<div class="flex flex-col items-center justify-center">
		<slot />
	</div>
</main>
