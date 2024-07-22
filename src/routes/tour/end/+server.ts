import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').ServerLoad} */
export function GET({ cookies }) {
  cookies.set('activeUser', "true", {
    path: '/',
    maxAge: 2147483647,
  });

  throw redirect(302, '/');
}