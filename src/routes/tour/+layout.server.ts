import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, url }) {
  const removeCookie = url.searchParams.get('rc');
  const activeUserCookie = cookies.get('activeUser');
  
  if (removeCookie) {
    cookies.delete('activeUser', { path: '/' });
  }

  if (activeUserCookie) {
    throw redirect(302, '/');
  }
}