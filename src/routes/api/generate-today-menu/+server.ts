import { createCohere } from '@ai-sdk/cohere';
import { streamText } from 'ai';
import { COHERE_API_KEY } from '$env/static/private';
import { GENERATE_MENUS_PROMPT } from '@/lib/prompts';

const cohere = createCohere({
  apiKey: COHERE_API_KEY,
});

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  console.log(request);

  const { user_preferences } = await request.json();

  console.log('START');

  const result = await streamText({
    model: cohere('command-r-plus'),
    messages: [
      {
        role: 'user',
        content: GENERATE_MENUS_PROMPT
      },
      {
        role: 'user',
        content: JSON.stringify(user_preferences)
      },
    ],
  });

  console.log(result);

  console.log('END');

  return result.toAIStreamResponse();
}
