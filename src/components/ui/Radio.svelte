<script lang="ts">
	export let group: string;
	export let value: string | boolean;
</script>

<label
	class={`rounded-full border border-neutral-400 px-4 py-2 text-sm text-neutral-400 ${value === group && '!border-vista-400 bg-vista-400 !text-neutral-50'}`}
>
	<span>
		<slot />
	</span>
	<input type="radio" class="appearance-none" {value} bind:group />
</label>
