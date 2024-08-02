![logo](https://fridge-ai.vercel.app/card.jpg)

# Fridge AI 🍽

PWA para el Hackathon de SDK AI de Vercel, creada por Midudev y Vercel.

## Descripción

Fridge AI es una PWA impulsada con IA. Genera tu menú semanal 100% personalizado, alternativas para no aburrirte y la lista de la compra, todo en un solo lugar.

Y si te preocupa tu nutrición, todos los menús tienen en cuenta tus datos para ser los más equilibrados y sanos para ti.

## Funcionalidades

- Almacena tus preferencias en localStorage
- Actualiza tus datos en cualquier momento:
  - Ingredientes que no te gustan
  - Tiempo de preparación medio para tus platos
  - Coste medio de la receta
  - Visualiza solo las comidas que necesitas
- Genera un menú semanal sano y equilibrado con IA
  - Obtén recetas alternativas para tus platos
  - Genera la preparación para la receta
- Genera una lista de compras para tu menú semanal:
  - Listado de ingredientes por plato
  - Listado de ingredientes por día
  - Listado de ingredientes por semana

## Tecnologías

- SvelteKit
- Vercel AI SDK
- Cohere
- Tailwindcss
- TypeScript

## Diseño de prototipo

[View in Figma](https://www.figma.com/design/SYq4uQTkuRnJQl2cuccejy/Untitled?node-id=0-1&t=LO49p6sCoPetMl4e-1)

## TODO

- [x] Generar páginas y navegación
- [x] Preparar esquemas y local storage
- [x] Start tour para almacenar preferencias
- [x] UI base
  - [x] Home
  - [x] Meals
  - [x] Shopping list
  - [x] Settings
- [x] Prompt engineering
- [x] Prompt a json
- [x] Alergia, intolerancia o preferencias
- [x] Añadir tiempo de preparación en los platos
- [x] Mover nav al header en desktop
- [x] Regenerar menú diario completo
- [x] Botón borrar datos y cookies
- [x] Añadir cantidades en los ingredientes
- [x] Revisar ingredientes en route shopping list
- [x] Usar desestructuración para excluir posibles resultados extra de la AI
- [x] Limpiar stores al borrar datos y cookies
- [x] Completar dark mode
- [x] Texto descriptivo en route menus y shopping list debajo del título
- [x] Añadir tiempo de preparación medio en los ajustes del usuario
- [x] Añadir comidas a visualizar en los ajustes del usuario
- [x] Tooltips de uso en route home para la primera visita
- [x] Añadir a los prompts información nutricional (porcentajes semanales y diarios)
- [x] Mejorar dishcard placeholder
- [x] Añadir en ajustes el coste medio de la receta
- [x] Separar en tour alergias/intolerancias de preferencias
- [x] Quitar platos que te gustan, dejar solo los que no te gustan.
- [x] Añadir opción de usar Cohere API del usuario.
- [x] Mejorar ui funcionalidad de dislike.
- [x] Revisar textos, ortografía y gramática.
- [ ] Hacer que los platos no se generen en paralelo para mantener el contexto.
- [ ] Autocompletar ingredientes en tour
- [ ] Botón de agrupar por en la route shopping list
- [ ] Crear tests
- [ ] Crear CHANGELOG.md
- [ ] Landing page
- [ ] Añadir más idiomas
