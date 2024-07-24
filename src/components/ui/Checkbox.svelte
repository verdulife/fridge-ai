<script>
	export let checked = false;
</script>

<label
	class={`rounded-full border border-neutral-400 px-4 py-2 text-sm text-neutral-400 ${checked && '!border-vista-400 bg-vista-400 !text-neutral-50'}`}
>
	<span>
		<slot />
	</span>
	<input type="checkbox" class="appearance-none" bind:checked />
</label>
