<script>
	import Close from '@/assets/Close.svelte';
	import Button from './Button.svelte';

	export let open = false;

	function closeDialog() {
		open = false;
	}
</script>

<dialog
	{open}
	class="fixed bottom-0 z-50 h-[calc(100vh-96px)] w-full max-w-6xl overflow-hidden border-x bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700/40"
>
	<Button click={closeDialog} class="fixed right-4 top-4 ml-auto px-3 py-1">
		<Close class="size-5" />
	</Button>

	<slot />
</dialog>

<style>
	dialog {
		opacity: 0;
	}

	dialog[open] {
		opacity: 1;
		animation: dialog-open 0.3s ease-in-out both;
	}

	@keyframes dialog-open {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}
</style>
