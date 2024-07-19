<script>
	export let nextTour;
	export let brand = false;
</script>

<button
	on:click={nextTour}
	class={`rounded-md px-6 py-3 ${brand && 'bg-gradient-to-t from-vista-500 to-vista-400'} ${$$props.class}`}
>
	<slot />
</button>
