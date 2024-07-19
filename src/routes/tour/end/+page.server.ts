import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
  cookies.set('activeUser', "true", { path: '/' });
  redirect(302, '/');
}