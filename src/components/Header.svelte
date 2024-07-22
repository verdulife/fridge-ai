<script>
	import { page } from '$app/stores';
	import Logo from '@/assets/Logo.svelte';

	$: ({ pathname } = $page.url);
	$: isTour = pathname.includes('tour');
</script>

<header
	class={`fixed top-0 max-w-4xl z-30 flex h-24 w-full border-b border-x border-neutral-800 bg-neutral-950/70 backdrop-blur p-8 text-center ${isTour ? 'justify-center' : 'justify-end'}`}
>
	<Logo class={isTour ? 'w-32' : 'w-24'} />
</header>
