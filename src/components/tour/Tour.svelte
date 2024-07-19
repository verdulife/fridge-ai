<script lang="ts">
	import WelcomeTour from '@/components/tour/WelcomeTour.svelte';
	import LikeTour from '@/components/tour/LikeTour.svelte';
	import DislikeTour from '@/components/tour/DislikeTour.svelte';
	import AllergensTour from '@/components/tour/AllergensTour.svelte';
	import UserTour from '@/components/tour/UserTour.svelte';

	function nextTour(ev: Event) {
		const target = ev.currentTarget as EventTarget & {
			parentElement: HTMLElement & { parentElement: HTMLElement };
		};
		if (!target) return;

		const { nextElementSibling } = target.parentElement.parentElement;
		if (!nextElementSibling) return;

		nextElementSibling.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<ul class="flex size-full snap-x snap-mandatory overflow-x-auto">
	<li class="flex size-full shrink-0 snap-center p-8">
		<WelcomeTour {nextTour}></WelcomeTour>
	</li>

	<li class="flex size-full shrink-0 snap-center p-8">
		<LikeTour {nextTour}></LikeTour>
	</li>

	<li class="flex size-full shrink-0 snap-center p-8">
		<DislikeTour {nextTour}></DislikeTour>
	</li>

	<li class="flex size-full shrink-0 snap-center p-8">
		<AllergensTour {nextTour}></AllergensTour>
	</li>

	<li class="flex size-full shrink-0 snap-center p-8">
		<UserTour {nextTour}></UserTour>
	</li>
</ul>
