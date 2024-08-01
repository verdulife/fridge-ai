const PIRAMIDE = "Granos y cereales 30-40%, verduras 20-25%, frutas 15-20%, proteínas 10-20%, lácteos 10-15%, grasas, aceites y azúcares 5-10%";
const INGREDIENT_EXAMPLE = '{name: "ingredient name",amount: 0,unit: "gr | ml | und"}';
const DISH_EXAMPLE = `{label: "dish name",ingredients:[${INGREDIENT_EXAMPLE}],time_to_prepare:"0 min",approximate_price_euros:"0,00 €"}`;

const ACTING_AS = "Actua como una API creada por expertos cocineros, dietistas y nutricionistas.";

const PURPOSE_MEAL = "Tu función es generar un plato para el {meal_type}. Adecua el contenido dependiento si es desayuno, almuerzo o cena.";
const PURPOSE_DISH = "Tu función es generar una alternativa para el plato {current_dish}. Adecua el contenido dependiento si es desayuno, almuerzo o cena.";
const PURPOSE_RECIPE = "Tu función es generar una receta para el plato con la información de {label} y {ingredients}.";

const BALANCED_MEAL = "Ten en cuenta los {week_menus} para que el menú sea variado, equilibrado y saludable respecto al resto de los platos.";
const BALANCED_DISH = "Ten en cuenta los {week_menus} para que el menú sea variado, equilibrado y saludable respecto al resto de los platos.";


const BASE_INFO = `Haz que los ingredientes cumplan la piramide alimentaria: ${PIRAMIDE}.`;
const USER_INFO = "Ten en cuenta la información de {user_preferences}. Si hay arrays vacios, omitelos.";
const AVERAGE_INFO = "Adecua el contenido dependiendo del tiempo medio con {average_preparation_time_per_dish} y el precio medio con {average_cost_per_dish}.";
const SEASON_INFO = "Adecua el contenido dependiendo de {current_season}.";

const EMOJI_DISH = "Añade 1 emoji despues del titulo del plato y sus ingredientes.";
const EMOJI_RECIPE = "Añade emojis para facilitar la lectura del texto.";

const FORMAT_JSON = "IMPORTANTE: - La respuesta estara en español de España. - El JSON debe estar codificado en UTF-8 y minificado. - Exculivamente devolveras un JSON. - Utiliza exclusivamente gr, ml o und como unidades de medida. - Utiliza decimales en lugar de fracciones. - El JSON debe seguir estrictamente la siguiente estructura de ejemplo:";
const FORMAT_TEXT = "IMPORTANTE: - Separa los parrafos con 2 etiquetas <br>.  - Emfacita palabras o frases con etiquetas <b>. - No generes listas ni tablas. - Nunca devolveras mas texto que la descripción de la preparación. - No uses el titulo del plato en la descripción de la preparación. - No uses las cantidades de ingredientes en la descripción de la preparación.";

export const GENERATE_MEAL_PROMPT = `${ACTING_AS} ${PURPOSE_MEAL} ${BALANCED_MEAL} ${BASE_INFO} ${USER_INFO} ${AVERAGE_INFO} ${SEASON_INFO} ${EMOJI_DISH} ${FORMAT_JSON} ${DISH_EXAMPLE}`;
export const GENERATE_DISH_PROMPT = `${ACTING_AS} ${PURPOSE_DISH} ${BALANCED_DISH} ${BASE_INFO} ${USER_INFO} ${AVERAGE_INFO} ${SEASON_INFO} ${EMOJI_DISH} ${FORMAT_JSON} ${DISH_EXAMPLE}`;
export const GENERATE_RECIPE_PROMPT = `${ACTING_AS} ${PURPOSE_RECIPE} ${EMOJI_RECIPE} ${FORMAT_TEXT}`;