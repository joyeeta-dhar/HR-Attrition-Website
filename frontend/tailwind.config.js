/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#020617', // Deep Dark Navy
        surface: 'rgba(255, 255, 255, 0.05)',
        primary: {
          DEFAULT: '#06b6d4', // Neon Cyan
          glow: 'rgba(6, 182, 212, 0.5)',
        },
        secondary: {
          DEFAULT: '#3b82f6', // Electric Blue
          glow: 'rgba(59, 130, 246, 0.5)',
        },
        accent: {
          DEFAULT: '#d946ef', // Neon Purple/Pink
          glow: 'rgba(217, 70, 239, 0.5)',
        },
        alert: '#ef4444', // Neon Red
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse-slow 6s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'subtle-glow': 'subtle-glow 4s ease-in-out infinite',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100% { opacity: 0.6; transform: scale(1); }',
          '50% { opacity: 1; transform: scale(1.05); }',
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'subtle-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
