import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  const activeUserCookie = cookies.get('activeUser');
  const apiKeyCookie = cookies.get('apiKey');

  if (apiKeyCookie) {
    return {
      apikey_cookie: apiKeyCookie
    }
  }

  if (!activeUserCookie) {
    throw redirect(302, '/tour');
  }
}