// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure this path is correct for your project
  ],
  theme: {
    extend: {},
  },
  // Add daisyUI here
  plugins: [require("daisyui")],
}