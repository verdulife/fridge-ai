import type { RequestHandler } from './$types';

import { createCohere } from '@ai-sdk/cohere';
import { streamText } from 'ai';
import { COHERE_API_KEY } from '$env/static/private';

const cohere = createCohere({
	apiKey: COHERE_API_KEY
});

export const POST = (async ({ request }) => {
	const { messages } = await request.json();

	const result = await streamText({
		model: cohere('command-r-plus'),
		messages: messages,
	});

	return result.toAIStreamResponse();
}) satisfies RequestHandler;