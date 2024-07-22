<script>
	export let as = 'h2';
</script>

<svelte:element this={as} class={`text-4xl font-semibold ${$$props.class}`}>
	<slot />
</svelte:element>
