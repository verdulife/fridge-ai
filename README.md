# Fridge AI 🍽

This is a demo app for the Vercel AI SDK Hackathon, powered by Midudev.

## Description

Get your digital fridge powered by AI. This app allows you to know your food preferences and balance your meals. Store everything in your fridge and let the AI do the rest.

## Features

- Store your food preferences in local storage
- Generate a nutritionally balanced weekly meal
- Get alternative recipes for your favorite dishes
- Generate a shopping list for your weekly meal:
  - Get a list of ingredients
  - Calcule the use of ingredients each day
  - Notify you when you are low on ingredients
  - Reorder daily meals if you are low on ingredients to keep meal balance

## Tech stack

- SvelteKit
- Vercel AI SDK
- Cohere
- Tailwind
- TypeScript

## Design prototype

[View in Figma](https://www.figma.com/design/SYq4uQTkuRnJQl2cuccejy/Untitled?node-id=0-1&t=LO49p6sCoPetMl4e-1)

---

### To do

- [x] Add all dependencies
- [x] Generate pages and navigation
- [-] Base UI
  - [x] Home
  - [ ] Meals
  - [ ] Shopping list
  - [ ] Settings
- [x] Prepare schemas and local storage
- [x] Guided init to store preferences with AI
- [x] Prompt engineering
- [x] Prompt to json
- [x] Alergia intolerancia o preferencias
- [x] Añadir tiempo de preparación en los platos
- [x] Mover nav al header en desktop
- [ ] Añadir cantidades en los ingredientes
- [ ] Cambiar dialog por pagina con web view transitions (spotify)
- [ ] Completar dark mode
- [ ] Añadir a los prompts informacion nutricional (porcentages semanales y diarios)
- [ ] Auto-completar ingredientes en tour
- [ ] Regenerar menu diario completo
- [ ] Historial platos generados
- [ ] Make tests
- [ ] Webapp landing page
