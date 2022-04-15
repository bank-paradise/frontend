const theme = require("./src/themes/");
const defaultColors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...theme.colors,
      ...defaultColors,
    },
    fontFamily: {
      ...theme.fonts,
    },
  },
  plugins: [
    require("tailwindcss-animatecss")({
      classes: [],
      settings: {
        animatedSpeed: 250,
      },
      variants: ["responsive", "hover", "reduced-motion"],
    }),
  ],
};
