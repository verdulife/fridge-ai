<script lang="ts">
	export let placeholder: string | null = null;
	export let value: string;
	export let required = false;
</script>

<input
	{placeholder}
	{required}
	bind:value
	class={`w-full rounded-md border p-3 outline-none dark:border-neutral-800 dark:bg-neutral-900 ${$$props.class}`}
/>
