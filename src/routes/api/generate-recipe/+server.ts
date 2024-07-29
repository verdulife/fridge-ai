import { createCohere } from '@ai-sdk/cohere';
import { streamText } from 'ai';
import { COHERE_API_KEY } from '$env/static/private';
import { GENERATE_RECIPE_PROMPT } from '@/lib/prompt';

const cohere = createCohere({
  apiKey: COHERE_API_KEY,
});

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { menu_label, menu_ingredients, time_to_prepare } = await request.json();

  console.log('START');

  const result = await streamText({
    model: cohere('command-r-plus'),
    temperature: 1,
    messages: [
      {
        role: 'user',
        content: GENERATE_RECIPE_PROMPT
      },
      {
        role: 'user',
        content: JSON.stringify({ menu_label, menu_ingredients, time_to_prepare })
      },
    ],
  });

  return result.toAIStreamResponse();
}
