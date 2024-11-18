/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blackApp: "#131722",
        active: "#f0f3fa",
        redApp: "#f23645",
      },
    },
  },
  plugins: [],
};
