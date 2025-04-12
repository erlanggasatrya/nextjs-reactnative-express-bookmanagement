/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#36338D",
        secondary: "#6B4985",
      },
      fontFamily: {
        poppins: ["PoppinsRegular"], 
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      fontFamily: {
        thin: ["PoppinsThin"],
        extralight: ["PoppinsExtraLight"],
        light: ["PoppinsLight"],
        normal: ["PoppinsRegular"],
        medium: ["PoppinsMedium"],
        semibold: ["PoppinsSemiBold"],
        bold: ["PoppinsBold"],
        extrabold: ["PoppinsExtraBold"],
        black: ["PoppinsBlack"],
      },
    },
  },
  plugins: [],
};
