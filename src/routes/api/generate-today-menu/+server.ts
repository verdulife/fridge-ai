import { createCohere } from '@ai-sdk/cohere';
import { streamText } from 'ai';
import { COHERE_API_KEY } from '$env/static/private';
import { GENERATE_MENU_PROMPT } from '@/lib/prompt';
import { MENU_RESPONSE_EXAMPLE } from '@/lib/examples';

const cohere = createCohere({
  apiKey: COHERE_API_KEY,
});

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { user_preferences, menu_day, week_menus } = await request.json();

  console.log('START');

  const result = await streamText({
    model: cohere('command-r-plus'),
    messages: [
      {
        role: 'user',
        content: GENERATE_MENU_PROMPT
      },
      {
        role: 'assistant',
        content: MENU_RESPONSE_EXAMPLE
      },
      {
        role: 'user',
        content: JSON.stringify({ user_preferences, menu_day, week_menus })
      },
    ],
  });

  return result.toAIStreamResponse();
}
