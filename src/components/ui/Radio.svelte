<script lang="ts">
	export let group: string;
	export let value: string;
</script>

<label
	class={`rounded-full border border-neutral-400 px-4 py-2 text-sm text-neutral-400 ${value === group && 'bg-vista-300 !text-neutral-950'}`}
>
	<span>
		<slot />
	</span>
	<input type="radio" class="appearance-none" {value} bind:group />
</label>
