export const UI_COLORS = { bg_light: "#f5f5f5", bg_dark: "#0a0a0a", btn_light: "#404040", btn_dark: "#d4d4d4" };

export const MAX_BODY_VALUE = 300;

export const ERROR_PROMPT = "Los servidores están sufrieno una sobrecarga, por favor intentalo de nuevo.";

export const CONFIRM_MESSAGES = {
  delete_data: "¿Estás seguro de que quieres borrar tus datos y cookies?",
  remake_menu: "¿Estás seguro de que quieres generar un menú nuevo para hoy?",
  remake_dishe: "¿Estás seguro de que quieres generar una nueva receta?",
  remake_recipe: "¿Estás seguro de que quieres generar una nueva preparación?",
}

export const TIME_RANGES = {
  breakfast_from: 4,
  lunch_from: 12,
  dinner_to: 18
}

export const USER_INFO_LIB: { [key: string]: string } = {
  age: "años",
  height: "cm",
  weight: "kg",
};

export const average_preparation_options = [
  {
    id: "i-dont-care",
    name: "No me importa",
  },
  {
    id: "less-than-30-minutes",
    name: "Menos de 30 min",
  },
  {
    id: "less-than-1-hour",
    name: "Menos de 1 h",
  },
];

export const allergens_options = [
  {
    id: "crustaceos",
    name: "Crustáceos",
  },
  {
    id: "huevos",
    name: "Huevos",
  },
  {
    id: "pescado",
    name: "Pescado",
  },
  {
    id: "cacahuetes",
    name: "Cacahuetes",
  },
  {
    id: "soja",
    name: "Soja",
  },
  {
    id: "lacteos",
    name: "Lácteos",
  },
  {
    id: "frutos-secos",
    name: "Frutos secos",
  },
  {
    id: "apio",
    name: "Apio",
  },
  {
    id: "mostaza",
    name: "Mostaza",
  },
  {
    id: "sesamo",
    name: "Sésamo",
  },
  {
    id: "sulfitos",
    name: "Sulfitos",
  },
  {
    id: "moluscos",
    name: "Moluscos",
  },
  {
    id: "altramuces",
    name: "Altramuces",
  },
  {
    id: "vegetariano",
    name: "Vegetariano",
  },
  {
    id: "vegano",
    name: "Vegano",
  },
  {
    id: "celiaco",
    name: "Celiaco",
  },
];

export const gender_options = [
  {
    id: "female",
    name: "Femenino",
  },
  {
    id: "male",
    name: "Masculino",
  },
];

export const exercise_options = [
  {
    id: "none",
    name: "Nada",
  },
  {
    id: "low",
    name: "1-2 veces/semana",
  },
  {
    id: "medium",
    name: "3-4 veces/semana",
  },
  {
    id: "constant",
    name: "5 o más veces",
  }
];

export const WEEK_DAYS = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo"
];

export const AWAITING_RESPONSES = [
  "Preparando menus...",
  "Buscando alimentos...",
  "Creando lista de compra...",
  "Buscando recetas...",
  "Constrastando con el endocrino...",
  "Eliminando alimentos no deseados...",
  "Añadiendo alimentos deseados...",
  "Cotejando alergias...",
  "Descansando...",
  "Guardando resultados...",
  "Limpiando..."
];