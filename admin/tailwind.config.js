/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5F6FFF",
        secondary: "#E5E7EB",
        background: "#F9FAFC",
        text: "#1A202C",
        error: "#E74149",
      },
    },
  },
  plugins: [],
};
