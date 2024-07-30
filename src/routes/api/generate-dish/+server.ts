import { createCohere } from '@ai-sdk/cohere';
import { streamText } from 'ai';
import { COHERE_API_KEY } from '$env/static/private';
import { GENERATE_DISH_PROMPT } from '@/lib/prompt';

const cohere = createCohere({
  apiKey: COHERE_API_KEY,
});

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { user_preferences, current_dish, week_menus } = await request.json();

  console.log('START');

  const result = await streamText({
    model: cohere('command-r-plus'),
    messages: [
      {
        role: 'user',
        content: GENERATE_DISH_PROMPT
      },
      {
        role: 'user',
        content: JSON.stringify({ user_preferences, current_dish, week_menus })
      },
    ],
  });

  return result.toAIStreamResponse();
}
