<script>
	import 'driver.js/dist/driver.css';
	import '@/driver.pcss';

	import { UiPreferences } from '@/lib/stores';
	import { driver } from 'driver.js';
	import { onMount } from 'svelte';

	function setGuideDone() {
		$UiPreferences.guide_done = true;
	}

	const driverObj = driver({
		popoverClass: 'driverjs-theme',
		allowClose: false,
		showButtons: ['next'],
		nextBtnText: 'Siguiente',
		prevBtnText: 'Anterior',
		doneBtnText: 'Listo',
		onDestroyed: () => {
			setGuideDone();
		},
		steps: [
			{
				popover: {
					title: 'Bienvenido',
					description: 'Comencemos con una rapida introducción a Fridge AI.'
				}
			},
			{
				element: '#prev_next_days',
				popover: {
					title: 'Genera más menús',
					description:
						'Haz clic en los botones para generar menús para otros días. Tambien se generará un menú automáticamente si no hay ningún menú para el día actual.',
					side: 'bottom',
					align: 'center'
				}
			},
			{
				element: '.more_info_dish',
				popover: {
					title: 'Toda la información sobre el menú',
					description:
						'Haz clic en este botón para ver toda la información sobre el plato. Encontrarás todos los ingredientes, y como prepararlo.',
					side: 'bottom',
					align: 'center'
				}
			},
			{
				element: '.generate_alternative_dish',
				popover: {
					title: 'Genera otro plato',
					description: 'Si no te convence el plato, puedes generar una alternativa.',
					side: 'bottom',
					align: 'center'
				}
			},
			{
				element: '.like_dislike_ingredient',
				popover: {
					title: 'No me gusta',
					description:
						'Puedes marcar los ingredientes que no te gustan. Esto te ayudará a generar un menú más personalizado.',
					side: 'left',
					align: 'center'
				}
			},
			{
				element: '#nav_menus',
				popover: {
					title: 'Menus de la semana',
					description:
						'A medida que vayas generando menús, podras verlos aqui ordenados por el día de la semana.',
					side: 'bottom',
					align: 'center'
				}
			},
			{
				element: '#nav_shopping-list',
				popover: {
					title: 'Lista de la compra',
					description:
						'Aquí podrás ver todas las opciones de la lista de la compra de todos los menus semanales.',
					side: 'bottom',
					align: 'center'
				}
			}
		]
	});

	onMount(() => {
		driverObj.drive();
	});
</script>
