<script>
	import { getCurrentDay } from '@/lib/utils';
	import Heading from './ui/Heading.svelte';
</script>

<section class="px-8 lg:px-16">
	<Heading>Hoy, {getCurrentDay()}</Heading>
</section>
