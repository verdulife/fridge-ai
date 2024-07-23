<script>
	import { page } from '$app/stores';
	import Logo from '@/assets/Logo.svelte';

	$: ({ pathname } = $page.url);
	$: isTour = pathname.includes('tour');
</script>

<header
	class={`fixed top-0 z-30 flex h-24 w-full max-w-6xl border-x border-b border-neutral-300 bg-neutral-100/70 p-8 text-center backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/70 ${isTour ? 'justify-center' : 'justify-end'}`}
>
	<Logo class={isTour ? 'w-32' : 'w-24'} }></Logo>
</header>
