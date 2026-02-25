/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
        },
        '.scrollbar-thumb-blue-500': {
          'scrollbar-color': '#3b82f6 #f3f4f6',
        },
        '.scrollbar-track-gray-100': {
          'scrollbar-color': '#3b82f6 #f3f4f6',
        },
        '.scrollbar-thumb-blue-600:hover': {
          'scrollbar-color': '#2563eb #f3f4f6',
        },
        '::-webkit-scrollbar': {
          width: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: '#f3f4f6',
          'border-radius': '10px',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#3b82f6',
          'border-radius': '10px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#2563eb',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
