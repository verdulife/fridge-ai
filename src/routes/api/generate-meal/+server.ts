import { createCohere } from '@ai-sdk/cohere';
import { streamText } from 'ai';
import { COHERE_API_KEY } from '$env/static/private';
import { GENERATE_MEAL_PROMPT } from '@/lib/prompt';

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies, request }) {
  const apiKeyCookie = cookies.get('apiKey');

  console.log(`Using API Key: ${apiKeyCookie ? "User" : "Fridge AI"}`);

  const cohere = createCohere({
    apiKey: apiKeyCookie || COHERE_API_KEY,
  });

  const { user_preferences, meal_type, day, week_menus, current_season } = await request.json();

  console.log(`Generating ${meal_type}`);

  const result = await streamText({
    model: cohere('command-r-plus'),
    temperature: 1,
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
        content: `{"label":"Bol de frutas con yogur 🍉","ingredients":[{"name":"Yogur natural","amount":150,"unit":"gr"},{"name":"Sandía","amount":100,"unit":"gr"},{"name":"Melón","amount":100,"unit":"gr"},{"name":"Uva","amount":50,"unit":"gr"},{"name":"Kiwi","amount":1,"unit":"und"},{"name":"Miel","amount":5,"unit":"gr"}],"time_to_prepare":"10 min","approximate_price_euros":"1,20 €", "calories": 265, "nutritional_score": "B"}`
      },
      {
        role: 'user',
        content: JSON.stringify({ user_preferences, meal_type, day, week_menus, current_season })
      }
    ],
  });

  return result.toAIStreamResponse();
}
