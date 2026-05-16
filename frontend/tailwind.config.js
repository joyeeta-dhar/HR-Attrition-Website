/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc',
        primary: '#0f172a',    /* Deep Navy */
        secondary: '#64748b',  /* Cool Slate */
        accent: '#ea580c',     /* Burnt Orange */
        alert: '#dc2626',      /* Crimson */
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
