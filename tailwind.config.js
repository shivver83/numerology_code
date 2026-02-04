/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0f172a",
          card: "#1e293b",
          accent: "#a855f7",
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        signature: ['Dancing Script', 'cursive'],
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'glow': 'glow 3s infinite alternate',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(168, 85, 247, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)' },
        }
      },
    },
  },
  plugins: [],
}