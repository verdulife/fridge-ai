<script lang="ts">
	import type { DayType } from '@/lib/types';

	import { Menus, UserPreferences } from '@/lib/stores';
	import { setDislike, setLike } from '@/lib/utils';

	import Text from '@/components/ui/Text.svelte';
	import Heading from '@/components/ui/Heading.svelte';
	import Box from '@/components/ui/Box.svelte';
	import Button from '@/components/ui/Button.svelte';
	import Like from '@/assets/Like.svelte';
	import Dislike from '@/assets/Dislike.svelte';

	$: groupMenusByDay = Object.groupBy($Menus, ({ week_day }: DayType) =>
		week_day.toLocaleLowerCase()
	);
</script>

<div class="flex w-full flex-col items-start gap-8 p-4 lg:p-8">
	<Heading as="h1" class="text-4xl font-bold">Tu lista de la compra</Heading>

	{#each Object.entries(groupMenusByDay) as [day, menu]}
		<section class="flex w-full flex-col gap-4">
			<Text class="font-semibold">{day}</Text>

			{#if menu}
				<ul class="grid grid-cols-1 gap-1 lg:grid-cols-2">
					{#each menu[0].breakfast[0].menu_ingredients as ingredient}
						<li class="flex w-full flex-col gap-2">
							<Box class="flex h-full items-center justify-between gap-4 p-4">
								<Text class="first-letter:uppercase">{ingredient}</Text>

								<aside class="flex items-center gap-2">
									{#if !$UserPreferences.like.includes(ingredient)}
										<Button class="px-3 py-1" click={() => setLike(ingredient)}>
											<Like class="size-5" />
										</Button>
									{/if}

									{#if !$UserPreferences.dislike.includes(ingredient)}
										<Button class="px-3 py-1" click={() => setDislike(ingredient)}>
											<Dislike class="size-5" />
										</Button>
									{/if}
								</aside>
							</Box>
						</li>
					{/each}
				</ul>
			{/if}
		</section>
	{/each}
</div>
