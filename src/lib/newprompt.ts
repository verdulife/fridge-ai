const PIRAMIDE = '{"piramide_alimentaria":[{"grupo":"Granos y cereales","proporcion":"30-40%"},{"grupo":"Verduras","proporcion":"20-25%"},{"grupo":"Frutas","proporcion":"15-20%"},{"grupo":"Proteínas","proporcion":"10-20%"},{"grupo":"Lácteos","proporcion":"10-15%"},{"grupo":"Grasas, aceites y azúcares","proporcion":"5-10%"}]}';
const INGREDIENT_EXAMPLE = `{"name": "","amount": 0,"unit": ""}`;
const MEAL_EXAMPLE = `{"menu_label": "","menu_ingredients": [${INGREDIENT_EXAMPLE}],"time_to_prepare": ""}`;
const DAY_EXAMPLE = `{"week_day": "","breakfast": [${MEAL_EXAMPLE}],"lunch": [${MEAL_EXAMPLE}],"dinner": [${MEAL_EXAMPLE}]}`;

const ACTING_AS = "Actua como un experto cocinero, dietista y nutricionista.";
const PURPOSE_MENU = "Tu función es generar un menú diario.";
const PURPOSE_DISH = "Genera una alternativa al plato current_meal.";
const PURPOSE_RECIPE = "Genera una receta para el plato con menu_label, menu_ingredients y time_to_prepare.";

const BASE_INFO = "Ten en cuenta las siguientes proporciones:";
const BALANCED_MENU = "Los menús seran equilibrados y saludables, segun los menus que ya existan en week_menus.";
const BALANCED_DISH = "La alternativa al plato sera equilibrada y saludable, segun los menus que ya existan en week_menus.";

const USER_INFO = "Ten en cuenta la informacion de user_preferences.";
const DAY_MENU = "Genera el menú para el día de menu_day.";

const EMOJI_TEXTS = "Utiliza emojis tanto en los titulos como en los nombres de los ingredientes de forma elocuente.";

const FORMAT_JSON = "IMPORTANTE: - La respuesta etara en español de España. - El JSON debe estar codificado en UTF-8 y minificado.- Nunca devolveras mas texto que el JSON. - Respeta los tipos de cada propiedad del JSON. - Utiliza exclusivamente 'gr', 'ml' o 'und' como unidades de medida. - Para la propiedad amount, utiliza decimales en lugar de fracciones.- El JSON debe seguir estrictamente la siguiente estructura de ejemplo:";
const FORMAT_TEXT = "IMPORTANTE: - Separa el contenido cuando sea necesario con etiquetas <br>. - Cuando lo consideres, puedes envolver palabras o frases en etiquetas <b> o <i>. - No generes listas ni tablas. - Nunca devolveras mas texto que la descripción de la preparación. - No uses el titulo del plato en la descripción de la preparación. - No uses las cantidades de ingredientes en la descripción de la preparación.";

export const GENERATE_MENU_PROMPT = `${ACTING_AS} ${PURPOSE_MENU} ${BASE_INFO} ${PIRAMIDE} ${BALANCED_MENU} ${USER_INFO} ${DAY_MENU} ${EMOJI_TEXTS} ${FORMAT_JSON} ${DAY_EXAMPLE}`;
export const GENERATE_MEAL_PROMPT = `${ACTING_AS} ${PURPOSE_DISH} ${BASE_INFO} ${PIRAMIDE} ${BALANCED_DISH} ${USER_INFO} ${EMOJI_TEXTS} ${FORMAT_JSON} ${MEAL_EXAMPLE}`;
export const GENERATE_RECIPE_PROMPT = `${ACTING_AS} ${PURPOSE_RECIPE} ${EMOJI_TEXTS} ${FORMAT_TEXT}`;
