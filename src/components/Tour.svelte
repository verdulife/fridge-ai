<script>
	import Button from '@/components/ui/Button.svelte';

	function nextTour(ev) {
		const { currentTarget } = ev;
		const { nextElementSibling } = currentTarget.parentElement.parentElement;

		nextElementSibling?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<ul class="flex size-full snap-x snap-mandatory overflow-x-auto">
	<li class="relative w-full shrink-0 snap-center">
		<article class="flex size-full flex-col items-center justify-center gap-32">
			<div class="flex flex-col items-center justify-center gap-4">
				<h1 class="max-w-sm text-center text-4xl font-semibold">
					hola, soy tu nevera digital inteligente
				</h1>

				<p class="max-w-sm text-center">
					Olvídate para siempre lo que cocinar, si lo que cocinas es sano y equilibrado y si te hace
					falta comprar algo en el super.
				</p>

				<p class="max-w-sm text-center">
					Menú semanal, macronutrientes, kilocalorías, la lista de la compra, aquí lo tienes todo y
					gratuito.
				</p>
			</div>

			<Button class="w-1/2 md:w-1/5" {nextTour}>EMPEZAR</Button>
		</article>
	</li>

	<li class="relative w-full shrink-0 snap-center">
		<article class="flex size-full flex-col items-center justify-center">
			<div class="mb-40 flex flex-col items-center justify-center gap-4">
				<h1 class="max-w-sm text-center text-4xl font-semibold">
					hola, soy tu nevera digital inteligente
				</h1>

				<p class="max-w-sm text-center">
					Olvídate para siempre lo que cocinar, si lo que cocinas es sano y equilibrado y si te hace
					falta comprar algo en el super.
				</p>

				<p class="max-w-sm text-center">
					Menú semanal, macronutrientes, kilocalorías, la lista de la compra, aquí lo tienes todo y
					gratuito.
				</p>
			</div>

			<Button class="w-1/2 md:w-1/5" {nextTour}>EMPEZAR</Button>
		</article>
	</li>

	<li class="relative w-full shrink-0 snap-center">
		<article class="flex size-full flex-col items-center justify-center">
			<div class="mb-40 flex flex-col items-center justify-center gap-4">
				<h1 class="max-w-sm text-center text-4xl font-semibold">
					hola, soy tu nevera digital inteligente
				</h1>

				<p class="max-w-sm text-center">
					Olvídate para siempre lo que cocinar, si lo que cocinas es sano y equilibrado y si te hace
					falta comprar algo en el super.
				</p>

				<p class="max-w-sm text-center">
					Menú semanal, macronutrientes, kilocalorías, la lista de la compra, aquí lo tienes todo y
					gratuito.
				</p>
			</div>

			<Button class="w-1/2 md:w-1/5" {nextTour}>EMPEZAR</Button>
		</article>
	</li>
</ul>

<style>
	ul {
		scrollbar-width: none;
	}
</style>
