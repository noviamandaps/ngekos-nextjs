/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "ngekos-gray": "#5e6f76",
        "ngekos-orange": "#ff801a",
        "ngekos-almostwhite": "#f5f6f8",
        "ngekos-green": "#91bf77",
        "ngekos-black": "#070707",
      },
    },
  },
  plugins: [],
};
