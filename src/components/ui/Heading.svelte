<script>
	export let as = 'h2';
</script>

<svelte:element this={as} class={`text-4xl font-semibold text-balance ${$$props.class}`}>
	<slot />
</svelte:element>
