<script>
	import Today from '@/assets/Today.svelte';
	import Chef from '@/assets/Chef.svelte';
	import Cart from '@/assets/Cart.svelte';
	import User from '@/assets/User.svelte';

	export let icon;
</script>

{#if icon === 'home'}
	<Today />
{:else if icon === 'chef'}
	<Chef />
{:else if icon === 'cart'}
	<Cart />
{:else if icon === 'user'}
	<User />
{/if}
