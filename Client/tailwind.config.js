/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0061E0',
          dark: '#004BB5',
          light: '#3B82F6',
        },
        success: '#22C55E',
        sidebar: {
          bg: '#0061E0',
          active: '#004BB5',
        },
        dashboard: {
          bg: '#F4F7FE',
          card: '#FFFFFF',
        },
        // Reference image custom design tokens
        ref: {
          yellow: '#FFC933',
          yellowHover: '#F59E0B',
          yellowLight: '#FEF3C7',
          yellowTint: '#FFFBEB',
          teal: '#008C75',
          tealDark: '#0A6E5D',
          tealLight: '#E6F7F5',
          tealTint: '#F0FDFA',
          cream: '#FDFBF7',
          creamLight: '#FEFDF8',
          grid: '#F5EBDA',
          dark: '#111827',
          muted: '#64748B',
          border: '#F1E8D9',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(180, 130, 60, 0.08)',
        'warm-md': '0 8px 24px -4px rgba(180, 130, 60, 0.10)',
        'warm-lg': '0 16px 36px -6px rgba(180, 130, 60, 0.12)',
        'pill-button': '0 4px 0 0 #0F172A',
      }
    },
  },
  plugins: [],
}
