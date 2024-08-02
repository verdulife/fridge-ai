<script>
	export let as = 'h2';
</script>

<svelte:element
	this={as}
	data-title={$$props.title}
	class={`text-balance text-4xl font-semibold ${$$props.class}`}
>
	<slot />
</svelte:element>
