/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./style.css",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['"Satoshi"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#3b82f6',          // Used in bg-primary, border-primary
        body: '#64748B',             // Used in text-body
        bodydark: '#334155',         // Used in dark:text-bodydark
        strokedark: '#1e293b',       // Used in dark:border-strokedark
        stroke: '#CBD5E1',           // You might want this for border-stroke
        white: '#ffffff',
        meta: {
          4: '#f1f5f9',              // Used in bg-meta-4, border-meta-4
        },
      },
      boxShadow: {
        'custom-box': '0px 4px 10px rgba(0, 0, 0, 0.1)', // Used in shadow-custom-box
      },
      spacing: {
        '7.5': '1.875rem', // Used for h-7.5, w-7.5 in zoom buttons
      },
      zIndex: {
        1: '1', // Used in z-[1]
      },
    },
  },
  plugins: [],
};
