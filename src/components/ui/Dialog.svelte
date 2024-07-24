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
	class="fixed bottom-0 top-32 lg:top-48 border-x border-neutral-300 dark:border-neutral-700/40 z-50 size-full max-w-6xl overflow-hidden bg-neutral-100 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-300"
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
