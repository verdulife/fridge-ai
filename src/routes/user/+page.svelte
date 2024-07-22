<script>
	import { UserPreferences } from '@/lib/stores';
</script>

<section class="mb-32 flex flex-col gap-8 px-8 lg:px-16">
	<h1 class="text-4xl font-bold">Tus preferencias</h1>

	<ul class="flex flex-col gap-4">
		<li class="flex w-full flex-col gap-2">
			<article class="rounded-lg bg-neutral-900 p-4">
				<h2 class="text-xl font-bold">Ingredientes que te gustam</h2>
				<ul class="flex flex-col gap-1">
					{#each $UserPreferences.like as like}
						<li class="flex w-full max-w-xs shrink-0 snap-start">
							<article class="rounded-lg bg-neutral-900 p-4">
								<h3 class="text-lg font-bold">{like}</h3>
							</article>
						</li>
					{/each}
				</ul>
			</article>
		</li>
		<li class="flex w-full flex-col gap-2">
			<article class="rounded-lg bg-neutral-900 p-4">
				<h2 class="text-xl font-bold">Ingredientes que detestas</h2>
				<ul class="flex flex-col gap-1">
					{#each $UserPreferences.dislike as dislike}
						<li class="flex w-full max-w-xs shrink-0 snap-start">
							<article class="rounded-lg bg-neutral-900 p-4">
								<h3 class="text-lg font-bold">{dislike}</h3>
							</article>
						</li>
					{/each}
				</ul>
			</article>
		</li>
		<li class="flex w-full flex-col gap-2">
			<article class="rounded-lg bg-neutral-900 p-4">
				<h2 class="text-xl font-bold">Alergias, intolerancias y preferencias</h2>
				<ul class="flex flex-col gap-1">
					{#each $UserPreferences.allergens as allergen}
						<li class="flex w-full max-w-xs shrink-0 snap-start">
							<article class="rounded-lg bg-neutral-900 p-4">
								<h3 class="text-lg font-bold">{allergen}</h3>
							</article>
						</li>
					{/each}
				</ul>
			</article>
		</li>
		<li class="flex w-full flex-col gap-2">
			<article class="rounded-lg bg-neutral-900 p-4">
				<h2 class="text-xl font-bold">Tus datos</h2>
				<ul class="flex flex-col gap-1">
					<li class="flex w-full max-w-xs shrink-0 snap-start">
						<article class="rounded-lg bg-neutral-900 p-4">
							<h3 class="text-lg font-bold">Altura</h3>
							<p class="text-lg font-bold">{$UserPreferences.info.height}</p>
						</article>
					</li>
					<li class="flex w-full max-w-xs shrink-0 snap-start">
						<article class="rounded-lg bg-neutral-900 p-4">
							<h3 class="text-lg font-bold">Peso</h3>
							<p class="text-lg font-bold">{$UserPreferences.info.weight}</p>
						</article>
					</li>
					<li class="flex w-full max-w-xs shrink-0 snap-start">
						<article class="rounded-lg bg-neutral-900 p-4">
							<h3 class="text-lg font-bold">Edad</h3>
							<p class="text-lg font-bold">{$UserPreferences.info.age}</p>
						</article>
					</li>
					<li class="flex w-full max-w-xs shrink-0 snap-start">
						<article class="rounded-lg bg-neutral-900 p-4">
							<h3 class="text-lg font-bold">Género</h3>
							<p class="text-lg font-bold">{$UserPreferences.info.gender}</p>
						</article>
					</li>
					<li class="flex w-full max-w-xs shrink-0 snap-start">
						<article class="rounded-lg bg-neutral-900 p-4">
							<h3 class="text-lg font-bold">Tipo de ejercicio</h3>
							<p class="text-lg font-bold">{$UserPreferences.info.weekly_exercise}</p>
						</article>
					</li>
				</ul>
			</article>
		</li>
	</ul>
</section>
