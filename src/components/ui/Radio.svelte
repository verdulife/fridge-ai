<script lang="ts">
	export let group: string;
	export let value: string | boolean;
</script>

<label
	class={`rounded-full border px-4 py-2 text-sm ${value === group && '!border-vista-300 bg-vista-300 text-neutral-800'}`}
>
	<slot></slot>
	<input type="radio" class="hidden" {value} bind:group />
</label>
