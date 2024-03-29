/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter var, sans-serif"
        ],
      },
      colors: {
        main: {
          100: "#E7F0FF",
          900: "#0F6EFF",
        },
        gray: {
          50: "#00000040",
          100: "#00000080"
        }

      }
    },
  },
  plugins: [],
}
