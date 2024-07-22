<script lang="ts">
	export let placeholder: string | null = null;
	export let value: string;
	export let readonly = false;
</script>

<input
	{placeholder}
	{readonly}
	bind:value
	class="w-full rounded-md border border-neutral-800 bg-neutral-900 p-3 outline-none"
/>
