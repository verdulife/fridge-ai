import { createCohere } from '@ai-sdk/cohere';
import { streamText } from 'ai';
import { COHERE_API_KEY } from '$env/static/private';
import { GENERATE_MEAL_PROMPT } from '@/lib/prompt';

const cohere = createCohere({
  apiKey: COHERE_API_KEY,
});

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { user_preferences, meal_type, week_menus, current_season } = await request.json();

  console.log('Generating meal');

  const result = await streamText({
    model: cohere('command-r-plus'),
    messages: [
      {
        role: 'user',
        content: GENERATE_MEAL_PROMPT
      },
      {
        role: 'user',
        content: JSON.stringify({ user_preferences, meal_type, week_menus, current_season })
      },
    ],
  });

  return result.toAIStreamResponse();
}
