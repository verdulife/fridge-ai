<script>
	import { page } from '$app/stores';
	import Logo from '@/assets/Logo.svelte';

	$: ({ pathname } = $page.url);
	$: isTour = pathname.includes('tour');
</script>

<header
	class={`sticky top-0 flex border-b border-neutral-800 bg-neutral-950 z-30 w-full p-8 text-center ${isTour ? 'justify-center' : 'justify-end'}`}
>
	<Logo class={isTour ? 'w-32' : 'w-24'} />
</header>
