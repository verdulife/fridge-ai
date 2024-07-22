<script lang="ts">
	export let click: null | (() => void) = null;
</script>

<button
	on:click={click}
	class="flex items-center justify-center rounded-md border border-neutral-600 bg-neutral-800 p-4"
>
	<slot />
</button>
