/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        maBlue: '#1677E8',
        maDeepBlue: '#0D3B66',
        maTerracotta: '#C86B32',
        maWood: '#744329',
        maCream: '#FFF9F0',
        maGreen: '#2D8A57',
      },
    },
  },
  plugins: [],
};
