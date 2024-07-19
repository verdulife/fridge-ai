<script lang="ts">
	export let type = 'text';
	export let placeholder: string | null = null;
</script>

<input
	{type}
	{placeholder}
	class="w-full rounded-md border border-neutral-800 bg-neutral-900 p-4 outline-none"
/>
