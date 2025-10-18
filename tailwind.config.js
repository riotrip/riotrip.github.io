/** @type {import('tailwindcss').Config} */
export default {
  content: ["./docs/**/*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#333333',
        secondary: '#666666',
        accent: '#eaeaea',
        background: '#f9f9f9',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
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
        }
      }
    },
  },
  plugins: [],
}