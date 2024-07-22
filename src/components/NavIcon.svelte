<script>
	import Imago from '@/assets/Imago.svelte';
	import Chef from '@/assets/Chef.svelte';
	import Cart from '@/assets/Cart.svelte';
	import User from '@/assets/User.svelte';

	export let icon;
</script>

{#if icon === 'home'}
	<Imago class="icon icon-tabler icons-tabler-outline icon-tabler-home" />
{:else if icon === 'chef'}
	<Chef class="icon icon-tabler icons-tabler-outline icon-tabler-chef" />
{:else if icon === 'cart'}
	<Cart class="icon icon-tabler icons-tabler-outline icon-tabler-cart" />
{:else if icon === 'user'}
	<User class="icon icon-tabler icons-tabler-outline icon-tabler-user-cog" />
{/if}
