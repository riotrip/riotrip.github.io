/** @type {import('tailwindcss').Config} */
export default {
  content: ["./docs/**/*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'mono-black': '#0a0a0a',
        'mono-white': '#fafafa',
        'mono-gray': '#1a1a1a',
        'mono-gray-light': '#2a2a2a',
        'accent-red': '#e63946',
        'accent-red-dark': '#c1121f',
        primary: '#333333',
        secondary: '#666666',
        accent: '#eaeaea',
        background: '#f9f9f9',
      },
      fontFamily: {
        'display': ['Bebas Neue', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'jp': ['Noto Serif JP', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'scroll-pulse': 'scrollPulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          'from': { 
            opacity: '0',
            transform: 'translateY(30px)'
          },
          'to': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        scrollPulse: {
          '0%, 100%': { opacity: '0.3', height: '60px' },
          '50%': { opacity: '1', height: '80px' },
        }
      }
    },
  },
  plugins: [],
}