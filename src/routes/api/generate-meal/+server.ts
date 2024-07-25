import { createCohere } from '@ai-sdk/cohere';
import { streamText } from 'ai';
import { COHERE_API_KEY } from '$env/static/private';
import { GENERATE_MEAL_PROMPT } from '@/lib/prompts';

const cohere = createCohere({
  apiKey: COHERE_API_KEY,
});

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { user_preferences, current_meal, week_menus } = await request.json();

  console.log('START');

  const result = await streamText({
    model: cohere('command-r-plus'),
    seed: 137,
    temperature: 1,
    messages: [
      {
        role: 'user',
        content: GENERATE_MEAL_PROMPT
      },
      {
        role: 'user',
        content: JSON.stringify({ user_preferences, current_meal, week_menus })
      },
    ],
  });

  return result.toAIStreamResponse();
}
