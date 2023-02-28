/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '500px',
      md: '768px',
      lg: '900px',
    },
    extend: {
      colors: {
        main: '#f5f6fa',
        purple: '#5357b6',
        red: '#ED6368',
        palered: '#FFB8BB',
        hover: '#C5C6EF',
        graydark: '#68727e',
        grayhover: '#8c9aaa'
      },
    },
  },
  plugins: [],
}
