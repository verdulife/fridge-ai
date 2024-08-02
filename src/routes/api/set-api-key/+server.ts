import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').ServerLoad} */
export function GET({ cookies, request }) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get('apiKey');
  const deleteApiKeyCookie = searchParams.get('delete');

  if (deleteApiKeyCookie) {
    cookies.delete('apiKey', {
      path: '/',
    });
  }

  if (apiKey) {
    cookies.set('apiKey', apiKey, {
      path: '/',
      maxAge: 2147483647,
    });
  }

  throw redirect(302, '/user');
}