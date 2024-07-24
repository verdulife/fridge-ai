<script>
	export let click = () => {};
</script>

<button
	on:click={click}
	class={`rounded-full border border-neutral-300 bg-neutral-200 text-neutral-500 transition-colors hover:text-neutral-700 dark:border-neutral-700/40 dark:bg-neutral-800 dark:hover:text-neutral-300 ${$$props.class}`}
>
	<slot></slot>
</button>
