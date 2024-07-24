<script>
	import { page } from '$app/stores';
	import Logo from '@/assets/Logo.svelte';

	$: ({ pathname } = $page.url);
	$: isTour = pathname.includes('tour');
</script>

<header
	class={`sticky top-0 z-30 flex w-full max-w-6xl border-b border-neutral-300 bg-neutral-100/70 p-4 text-center backdrop-blur lg:p-8 dark:border-neutral-700/40 dark:bg-neutral-950/70 ${isTour ? 'justify-center' : 'justify-end'}`}
>
	<Logo class={isTour ? 'h-9' : 'h-7'} }></Logo>
</header>
