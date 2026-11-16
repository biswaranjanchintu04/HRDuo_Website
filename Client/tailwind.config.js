/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hrduo: {
          navy: '#002D62',
          navyDark: '#001E42',
          navyLight: '#EBF3FA',
          teal: '#00A8A8',
          tealDark: '#008585',
          tealLight: '#E6F8F8',
          slate: '#1B365D',
          body: '#334E68',
          muted: '#627D98',
          border: '#D9E2EC',
          canvas: '#F8FAFC',
        },
        primary: {
          DEFAULT: '#002D62',
          dark: '#001E42',
          light: '#00A8A8',
          brand: '#002D62',
        },
        success: '#00A8A8',
        sidebar: {
          bg: '#002D62',
          active: '#001E42',
        },
        dashboard: {
          bg: '#F4F7FE',
          card: '#FFFFFF',
        },
        kart: {
          blue: '#002D62',
          blueDark: '#001E42',
          blueLight: '#EBF3FA',
          green: '#00A8A8',
          greenDark: '#008585',
          greenLight: '#E6F8F8',
          dark: '#001E42',
          navy: '#002D62',
          slate: '#1B365D',
          muted: '#627D98',
          canvas: '#F8FAFC',
          border: '#D9E2EC',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        poppins: ['Inter', 'sans-serif'],
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(100%)' },
        }
      },
      animation: {
        scan: 'scan 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
