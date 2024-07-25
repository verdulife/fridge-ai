<script>
	import { page } from '$app/stores';
	import Logo from '@/assets/Logo.svelte';

	$: ({ pathname } = $page.url);
	$: isTour = pathname.includes('tour');
</script>

<header
	class="fixed top-0 z-30 flex h-16 w-full max-w-6xl justify-end border-x border-b border-neutral-300 bg-neutral-100 p-4 text-center backdrop-blur lg:h-24 lg:p-8 dark:border-neutral-700/40 dark:bg-neutral-950/70"
	class:justify-center={isTour}
>
	<Logo class={isTour ? 'h-9' : 'h-7'} }></Logo>
</header>
