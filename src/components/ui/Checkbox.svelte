<script>
	export let checked = false;
</script>

<label
	class={`0 rounded-full border border-neutral-400 px-4 py-2 text-sm ${checked && '!border-vista-300 bg-vista-300 text-neutral-800'}`}
>
	<slot></slot>
	<input type="checkbox" class="hidden" bind:checked />
</label>
