<script lang="ts">
	import { useChat } from '@ai-sdk/svelte';

	const { input, handleSubmit, messages } = useChat();
</script>

<section class="flex size-full flex-col items-center justify-center p-4 overflow-y-auto">
	<ul class="size-full space-y-4 border">
		{#each $messages as message}
			<li class="border-b p-2">{message.role}: {message.content}</li>
		{/each}
	</ul>
</section>

<footer class="flex w-full flex-col items-center justify-center p-4">
	<form on:submit={handleSubmit} class="flex w-full items-center justify-center gap-2">
		<input
			bind:value={$input}
			class="w-full rounded-lg border border-neutral-800 bg-transparent p-4"
		/>
		<button class="rounded-lg bg-neutral-800 px-6 py-4">Send</button>
	</form>
</footer>
