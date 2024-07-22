<script>
	export let href;
	export let brand = false;
</script>

<a
	{href}
	class={`flex items-center justify-center gap-2 rounded-md px-6 py-3 ${brand && 'bg-gradient-to-t from-vista-500 to-vista-400'} ${$$props.class}`}
>
	<slot />
</a>
