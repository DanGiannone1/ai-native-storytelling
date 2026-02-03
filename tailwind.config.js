/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
    "./catalog/**/*.{js,ts,jsx,tsx}",
    "./presentations/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deck-bg': '#02040a',
        'deck-surface': '#0a0f1e',
      },
      animation: {
        'spin-slow': 'spin 50s linear infinite',
        'spin-slower': 'spin 70s linear infinite reverse',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
