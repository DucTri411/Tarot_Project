/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        galaxy: {
          darkest: '#110515',
          dark: '#221545',
          light: '#B26FCB',
          primary: '#68388D',
          secondary: '#855AB4'
        }
      }
    },
  },
  plugins: [],
}
