<script lang="ts">
	export let href: string;
</script>

<a
	{href}
	class={`rounded-full border border-neutral-300 text-center bg-neutral-200 text-neutral-500 transition-colors hover:text-neutral-700 dark:border-neutral-700/40 dark:bg-neutral-800 dark:hover:text-neutral-300 ${$$props.class}`}
>
	<slot></slot>
</a>
