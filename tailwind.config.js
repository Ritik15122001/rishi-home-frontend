/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  corePlugins: {
    // The ported design CSS already provides its own reset + component styles.
    // Disabling preflight avoids Tailwind's reset fighting the original design.
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        bg: "#F7F4EE",
        surface: "#EFEAE1",
        "surface-2": "#E7E0D4",
        dark: "#171717",
        "dark-2": "#201E1C",
        ink: "#24221F",
        muted: "#777169",
        accent: "#9A7352",
        gold: "#C4A77A",
        terra: "#B4593A",
        olive: "#6B6A4F",
        border: "#DED7CC",
        "border-dark": "#332F2B"
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "'Times New Roman'", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "Helvetica", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};
