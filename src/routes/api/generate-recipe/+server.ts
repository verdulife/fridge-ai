import { createCohere } from '@ai-sdk/cohere';
import { streamText } from 'ai';
import { COHERE_API_KEY } from '$env/static/private';
import { GENERATE_RECIPE_PROMPT } from '@/lib/prompt';

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies, request }) {
  const apiKeyCookie = cookies.get('apiKey');

  console.log(`Using API Key: ${apiKeyCookie ? "User" : "Fridge AI"}`);

  const cohere = createCohere({
    apiKey: apiKeyCookie || COHERE_API_KEY,
  });

  const { label, ingredients, time_to_prepare } = await request.json();

  console.log('Generating recipe');

  const result = await streamText({
    model: cohere('command-r-plus'),
    messages: [
      {
        role: 'user',
        content: GENERATE_RECIPE_PROMPT
      },
      {
        role: 'user',
        content: JSON.stringify({ label, ingredients, time_to_prepare })
      },
    ],
  });

  return result.toAIStreamResponse();
}
