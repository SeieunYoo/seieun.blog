/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      tablet: "768px",
    },
  },
  plugins: [],
};
