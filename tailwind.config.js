/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        latoReg: ["Lato-Regular", "sans-serif"],
        latoBold: ["Lato-Bold", "sans-serif"],
        montReg: ["Montserrat-Regular", "sans-serif"],
        montSemi: ["Montserrat-SemiBold", "sans-serif"],
        montBold: ["Montserrat-Bold", "sans-serif"],
      },
      colors: {
        primary: "#282C75", // Example primary color
        secondary: "#E8E8E9", // Example secondary color
      },
    },
  },
  plugins: [],
};
