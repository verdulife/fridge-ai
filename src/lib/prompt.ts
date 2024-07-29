const PIRAMIDE = '{"piramide_alimentaria":[{"grupo":"Granos y cereales","proporcion":"30-40%"},{"grupo":"Verduras","proporcion":"20-25%"},{"grupo":"Frutas","proporcion":"15-20%"},{"grupo":"Proteínas","proporcion":"10-20%"},{"grupo":"Lácteos","proporcion":"10-15%"},{"grupo":"Grasas, aceites y azúcares","proporcion":"5-10%"}]}';
const INGREDIENT_EXAMPLE = `{"name": "Ingrediente de ejemplo","amount": 0,"unit": "gr | ml | und"}`;
const DISH_EXAMPLE = `{"menu_label": "Plato de ejemplo","menu_ingredients": [${INGREDIENT_EXAMPLE}],"time_to_prepare": "20 min"}`;
const DAY_EXAMPLE = `{"week_day": "Lunes | Martes | Miércoles | Jueves | Viernes | Sábado","breakfast": ${DISH_EXAMPLE},"lunch": ${DISH_EXAMPLE},"dinner": ${DISH_EXAMPLE}}`;

const ACTING_AS = "Actua como un experto cocinero, dietista y nutricionista.";
const PURPOSE_MENU = "Tu función es generar un menú diario.";
const PURPOSE_DISH = "Genera una alternativa al plato current_meal.";
const PURPOSE_RECIPE = "Genera una receta para el plato con menu_label, menu_ingredients y time_to_prepare.";

const BALANCED_MENU = "Ten en cuenta los week_menus y genera un menú diario variado, equilibrado y saludable.";
const BALANCED_DISH = "Ten en cuenta los week_menus y genera un plato variado, equilibrado y saludable.";
const BASE_INFO = `Para los ingredientes de los menús y platos, haz que cumplan lo siguiente: ${PIRAMIDE}.`;

const USER_INFO = "Ten en cuenta la informacion de user_preferences.";
const DAY_MENU = "Genera el menú para el día de menu_day.";

const EMOJI_TEXTS = "Utiliza emojis despues de los titulos y los nombres de los ingredientes.";

const FORMAT_JSON = `IMPORTANTE:
  - La respuesta estara en español de España.
  - El JSON debe estar codificado en UTF-8 y minificado.
  - Nunca devolveras mas texto que el JSON.
  - Respeta los tipos de cada propiedad del JSON.
  - Utiliza exclusivamente gr, ml o und como unidades de medida.
  - Para la propiedad amount, utiliza decimales en lugar de fracciones.
  - Verifica que el JSON sea válido y haz la corrección de errores de sintaxis si es necesario.
  - El JSON debe seguir estrictamente la siguiente estructura de ejemplo:`;
const FORMAT_TEXT = "IMPORTANTE: - Separa el contenido cuando sea necesario con etiquetas <br>. - Cuando lo consideres, puedes envolver palabras o frases en etiquetas <b> o <i>. - No generes listas ni tablas. - Nunca devolveras mas texto que la descripción de la preparación. - No uses el titulo del plato en la descripción de la preparación. - No uses las cantidades de ingredientes en la descripción de la preparación.";

export const GENERATE_MENU_PROMPT = `${ACTING_AS} ${PURPOSE_MENU} ${BALANCED_MENU} ${BASE_INFO} ${USER_INFO} ${DAY_MENU} ${EMOJI_TEXTS} ${FORMAT_JSON} ${DAY_EXAMPLE}`;
export const GENERATE_DISH_PROMPT = `${ACTING_AS} ${PURPOSE_DISH} ${BALANCED_DISH} ${BASE_INFO} ${USER_INFO} ${EMOJI_TEXTS} ${FORMAT_JSON} ${DISH_EXAMPLE}`;
export const GENERATE_RECIPE_PROMPT = `${ACTING_AS} ${PURPOSE_RECIPE} ${EMOJI_TEXTS} ${FORMAT_TEXT}`;
