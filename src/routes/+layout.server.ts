
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, url }) {
  const { pathname } = url;
  if (pathname === '/tour') return {};

  const activeUserCookie = cookies.get('activeUser');

  if (!activeUserCookie) {
    throw redirect(302, '/tour');
  }
}