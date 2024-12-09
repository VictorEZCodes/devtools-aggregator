/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#4A90E2',
          600: '#357ABD',
        },
        accent: '#FFC107',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}