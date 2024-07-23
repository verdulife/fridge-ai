<script>
	import { routes } from '@/lib/routes';
	import NavIcon from '@/components/NavIcon.svelte';
	import Text from '@/components/ui/Text.svelte';
</script>

<footer
	class="fixed bottom-0 flex w-full max-w-6xl items-center justify-center border-x border-t border-neutral-300 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/70 backdrop-blur p-4"
>
	<nav>
		<ul class="flex gap-6">
			{#each routes as route}
				<li>
					<a href={route.path} class="size-16 flex flex-col items-center justify-center text-neutral-800 dark:text-neutral-400">
						<NavIcon icon={route.icon} />
						<Text class="sr-only">{route.label}</Text>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</footer>
