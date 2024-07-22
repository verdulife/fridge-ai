import { createCohere } from '@ai-sdk/cohere';
import { streamText } from 'ai';
import { COHERE_API_KEY } from '$env/static/private';
import { GENERATE_MENUS_PROMPT } from '@/lib/prompts';

const cohere = createCohere({
  apiKey: COHERE_API_KEY,
});

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
<<<<<<< HEAD
=======
  console.log(request);

>>>>>>> 90f9b0c6e20096c89f211ba8360d384aca8f1089
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

<<<<<<< HEAD
=======
  console.log(result);

  console.log('END');

>>>>>>> 90f9b0c6e20096c89f211ba8360d384aca8f1089
  return result.toAIStreamResponse();
}
