<script>
	export let group = '';
	export let value = false;
</script>

<label
	class={`rounded-full border border-neutral-400 px-4 py-2 text-sm text-neutral-400 ${value && 'bg-vista-400 text-neutral-200'}`}
>
	<span>
		<slot />
	</span>
	<input type="radio" class="appearance-none" bind:value bind:group />
</label>
