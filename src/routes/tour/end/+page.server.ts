/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
  if (cookies.get('activeUser') === 'true') return {};
  cookies.set('activeUser', "true", { path: '/' });
}