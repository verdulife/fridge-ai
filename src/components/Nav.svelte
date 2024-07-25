<script lang="ts">
	import type { RouteType } from '@/lib/types';

	import { page } from '$app/stores';
	import { routes } from '@/lib/routes';

	import NavIcon from '@/components/NavIcon.svelte';
	import Text from '@/components/ui/Text.svelte';

	$: isActive = (route: RouteType) => $page.url.pathname === route.path;
</script>

<footer
	class="fixed bottom-0 z-40 flex h-24 w-full max-w-6xl items-center justify-center border-t border-neutral-300 bg-neutral-50/70 p-4 backdrop-blur lg:bottom-auto lg:top-0 lg:justify-start lg:border-t-0 lg:bg-transparent lg:p-8 lg:backdrop-blur-none dark:border-neutral-700/40 dark:bg-neutral-950/70 dark:lg:bg-transparent"
>
	<nav>
		<ul class="flex items-center gap-6 lg:gap-0">
			{#each routes as route}
				<li>
					<a
						href={route.path}
						class={`flex size-16 items-center justify-center gap-2 rounded-full text-neutral-400 lg:size-auto lg:py-2 lg:pl-4 lg:pr-5 lg:text-neutral-800 dark:text-neutral-600 ${isActive(route) && 'text-neutral-800 lg:border lg:border-neutral-300 lg:bg-neutral-50 lg:text-neutral-800 dark:text-neutral-200 dark:lg:border-neutral-700 dark:lg:bg-neutral-800'}`}
					>
						<NavIcon icon={route.icon} />
						<Text class="sr-only lg:not-sr-only">{route.label}</Text>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</footer>
