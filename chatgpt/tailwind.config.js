/** @type {import('tailwindcss').Config} */
export default {
 darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      light: "#F4F4F4",
      prlight: "#EEEEEE",
      seclight: "#D6D6D6",
      tetlight: "#F5F5F5",
      yellow: "#FEC553",
      green: "#10A37F",
      mint: "#D8EFE9",
      darkmint:"#B0D7CD",
      black: "#1E1F22",
      prdark: "#282A2E",
      secdark: "#3F424A",
      gray: "#ABABAB",
      lgaccent: "#858B9D",
      darkaccent: "#4B4F5B",
      tetaccent: "#28303F"
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      }
    }
  },
  plugins: []
};
