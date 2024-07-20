import { json } from '@sveltejs/kit';
import { createCohere } from '@ai-sdk/cohere';
import { generateText } from 'ai';
import { COHERE_API_KEY } from '$env/static/private';
import { GENERATE_INGRIDIENTS_PROMPT, MENU_ITEMS_EXAMPLE } from '@/lib/prompts';

const cohere = createCohere({
	apiKey: COHERE_API_KEY,
});

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { dish } = await request.json();
	
	const { text } = await generateText({
		model: cohere('command-r-plus'),
		messages: [
			{
				role: 'user',
				content: GENERATE_INGRIDIENTS_PROMPT
			},
			{
				role: 'assistant',
				content: JSON.stringify(MENU_ITEMS_EXAMPLE)
			},
			{
				role: 'user',
				content: dish
			},
		],
		frequencyPenalty: 0,
		presencePenalty: 0,
		temperature: 0
	});

	return json(text);
}
