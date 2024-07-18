<script>
	export let nextTour;
</script>

<button
	on:click={nextTour}
	class={`rounded-md bg-gradient-to-t from-vista-500 to-vista-400 px-6 py-3 ${$$props.class}`}
>
	<slot />
</button>
