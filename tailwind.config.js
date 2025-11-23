export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "light-secondary": "#f1f1f1",
        "light-primary": "#ffffff",
        "light-tertiary": "#d3d3d3",
        "light-shade": "#f9f9f9",
        "light-text": "#333333",
        "dark-secondary": "#246a80",
        "dark-primary": "#138926",
        "dark-tertiary": "#508899",
        "dark-shade": "#a1d0a8",
        "dark-text": "#e7f8de",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark", "dark-mode"],
      color: ["dark", "dark-mode"],
    },
  },
  plugins: [],
};
