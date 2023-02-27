/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '900px',
    },
    extend: {
      colors: {
        main: '#f5f6fa',
        purple: '#5357b6',
        hover: '#C5C6EF'
      },
    },
  },
  plugins: [],
}
