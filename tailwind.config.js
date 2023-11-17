import colors from 'tailwindcss/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
      },
      // Other theme customizations...
    },
  },
  plugins: [

  ],
};