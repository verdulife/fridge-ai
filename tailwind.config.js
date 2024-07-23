/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'vista': {
          '50': '#effaf4',
          '100': '#d9f2e2',
          '200': '#b5e5c9',
          '300': '#85d0a9',
          '400': '#52b585',
          '500': '#309969',
          '600': '#217a54',
          '700': '#1a6244',
          '800': '#174e38',
          '900': '#144030',
          '950': '#0a241b',
        },
      }
    },
  },
  plugins: [],
}

