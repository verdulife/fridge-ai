import { createCohere } from '@ai-sdk/cohere';
import { streamText } from 'ai';
import { COHERE_API_KEY } from '$env/static/private';
import { EVAL_MENUS_PROMPT } from '@/lib/prompt';

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies, request }) {
  const apiKeyCookie = cookies.get('apiKey');

  console.log(`Using API Key: ${apiKeyCookie ? "User" : "Fridge AI"}`);

  const cohere = createCohere({
    apiKey: apiKeyCookie || COHERE_API_KEY,
  });

  const { user_preferences, week_menus } = await request.json();

  console.log(`Evaluating ${week_menus}`);

  const result = await streamText({
    model: cohere('command-r-plus'),
    temperature: 1,
    messages: [
      {
        role: 'user',
        content: EVAL_MENUS_PROMPT
      },
      {
        role: 'user',
        content: JSON.stringify({ user_preferences, week_menus })
      }
    ],
  });

  return result.toAIStreamResponse();
}
