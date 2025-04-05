/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      green: "#10A37F",
      black: "#1E1F22",
      bglight: "#F5F5F5",
      secdark: "#282A2E",
      tetdark: "#3F424A",
      softgray: "#ABABAB",
      accentbg: "#4B4F5B",
      accenttext: "#868FA7",

      /*Functional Colors*/
      teal: "#10A37F",
      mint: "#D2F4EA",
      charcoal: "#2B2C2F",
      darkgray: "#3E4147",
      gray: "#585C66",
      /*Accent Colors*/
      yellow: "#FFCB47",
      coralred: "#FF6B6B",
      /*Neutral Colors*/
      lightNgray: "#E5E5E5",
      white: "#FFFFFF"
    },
    extend: {}
  },
  plugins: []
};
