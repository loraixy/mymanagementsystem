/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {

      width: {
        '210': '13.13rem'
      }

    },
  },
  plugins: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
}

