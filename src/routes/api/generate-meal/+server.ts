import { createCohere } from '@ai-sdk/cohere';
import { streamText } from 'ai';
import { COHERE_API_KEY } from '$env/static/private';
import { GENERATE_MEAL_PROMPT } from '@/lib/prompt';

const cohere = createCohere({
  apiKey: COHERE_API_KEY,
});

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { user_preferences, meal_type, day, week_menus, current_season } = await request.json();

  console.log(`Generating ${meal_type}`);

  const result = await streamText({
    model: cohere('command-r-plus'),
    messages: [
      {
        role: 'user',
        content: GENERATE_MEAL_PROMPT
      },
      {
        role: 'user',
        content: JSON.stringify({ user_preferences, meal_type: 'breakfast', day, week_menus, current_season })
      },
      {
        role: 'assistant',
        content: `{"label":"Bol de frutas con yogur 🍉","ingredients":[{"name":"Yogur natural","amount":150,"unit":"gr"},{"name":"Sandía","amount":100,"unit":"gr"},{"name":"Melón","amount":100,"unit":"gr"},{"name":"Uva","amount":50,"unit":"gr"},{"name":"Kiwi","amount":1,"unit":"und"},{"name":"Miel","amount":5,"unit":"gr"}],"time_to_prepare":"10 min","approximate_price_euros":"1,20 €"}`
      },
      {
        role: 'user',
        content: JSON.stringify({ user_preferences, meal_type: 'lunch', day, week_menus, current_season })
      },
      {
        role: 'assistant',
        content: `{"label":"Ensalada de pasta con atún 🐟","ingredients":[{"name":"Pasta","amount":80,"unit":"gr"},{"name":"Atún en conserva","amount":50,"unit":"gr"},{"name":"Tomate cherry","amount":100,"unit":"gr"},{"name":"Lechuga","amount":50,"unit":"gr"},{"name":"Zanahoria","amount":30,"unit":"gr"},{"name":"Maíz dulce","amount":20,"unit":"gr"},{"name":"Aceite de oliva","amount":5,"unit":"ml"},{"name":"Vinagre de manzana","amount":3,"unit":"ml"},{"name":"Sal y pimienta","amount":1,"unit":"pizca"}],"time_to_prepare":"15 min","approximate_price_euros":"1,80 €"}`
      },
      {
        role: 'user',
        content: JSON.stringify({ user_preferences, meal_type: 'dinner', day, week_menus, current_season })
      },
      {
        role: 'assistant',
        content: `{"label":"Tortilla de espinacas con queso 🍳","ingredients":[{"name":"Huevos","amount":2,"unit":"und"},{"name":"Espinacas","amount":50,"unit":"gr"},{"name":"Queso rallado","amount":30,"unit":"gr"},{"name":"Aceite de oliva","amount":1,"unit":"cucharada"},{"name":"Sal y pimienta","amount":1,"unit":"pizca"}],"time_to_prepare":"15 min","approximate_price_euros":"1,50 €"}`
      },
      {
        role: 'user',
        content: JSON.stringify({ user_preferences, meal_type, day, week_menus, current_season })
      }
    ],
  });

  return result.toAIStreamResponse();
}
