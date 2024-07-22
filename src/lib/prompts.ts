export const [INIT_PROMPT, ...CONSTANT_PROMPT] = [
	"Eres una API programada por expertos dietistas y nutricionistas.",
	"Siempre que puedas, añade al titulo del menu un emoji que represente al ingrediente principal del menú.",
	"Siempre que puedas, añade al nombre del ingrediente un emoji que lo represente.",
	"Nunca devolveras mas texto que el JSON. El idioma español sera de España.",
	"El JSON debe seguir estrictamente la siguiente estructura, sin añadir ni quitar ninguna propiedad:",
];

export const MENU_ITEMS_EXAMPLE = [
	{
		label: "Huevos",
		amount: "2p",
		macronutrients: ["proteínas", "carbohidratos", "grasas", "sal"],
		calories: 155
	},
	{
		label: "Aguacate",
		amount: "1p",
		macronutrients: ["proteínas", "carbohidratos", "grasas", "fibra"],
		calories: 141
	},
	{
		label: "Queso en polvo",
		amount: "10gr",
		macronutrients: ["proteínas", "carbohidratos", "grasas", "fibra"],
		calories: 141
	},
]

const MEAL_EXAMPLE = {
	menu_label: "Huevos revueltos con aguacate",
	menu_items: MENU_ITEMS_EXAMPLE
}

const DAY_EXAMPLE = {
	week_day: "Lunes",
	breakfast: [
		MEAL_EXAMPLE,
	],
	lunch: [
		MEAL_EXAMPLE
	],
	dinner: [
		MEAL_EXAMPLE
	]
}

export const GENERATE_MENUS_PROMPT = `
${INIT_PROMPT}
Se te proporcionara informacion sobre los gustos, alergias e intolerancias, asi como la altura, peso, edad, sexo y la cantidad de ejericio que realiza a la semana el usuario.
Si el usuario es vegetariano, vegano o celiaco, deberas generar menús de comida vegetariana, vegana o celiaca respectivamente.
Devolverás un JSON con un menú diario.
Tendras en cuenta los datos del usuario al generar los menús.
Tendras un array con los menús de cada día de la semana, el cual puede estar vacio, parcialmente lleno o completamente lleno.
Si existen mas menús, los tendras en cuenta para que entre ellos sean equilibrados y sanos.
${CONSTANT_PROMPT}
${JSON.stringify(DAY_EXAMPLE)},`;