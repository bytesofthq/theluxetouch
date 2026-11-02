import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#073C33", // Deep Emerald
          dark: "#052D27",    // Dark Forest
          light: "#0A4F44",
          container: "#073C33",
          fixed: "#bbeddf",
        },
        secondary: {
          DEFAULT: "#D8B77E", // Champagne Gold
          fixed: "#FFDEA7",
          dim: "#E4C288",
          dark: "#745A2A",
          container: "#FEDB9F",
        },
        surface: {
          DEFAULT: "#FEF9F0", // Warm Ivory
          dim: "#DED9D1",
          bright: "#FEF9F0",
          container: "#F2EDE4",
          "container-low": "#F8F3EA",
          "container-high": "#ECE8DF",
          "container-lowest": "#FFFFFF",
          admin: "#F7F6F2",
          card: "#FFFFFF",
        },
        espresso: {
          DEFAULT: "#30251F",
          muted: "#827B72",
        },
        rose: {
          DEFAULT: "#C9A49A",
          tint: "rgba(201, 164, 154, 0.15)",
        },
        admin: {
          border: "#EAE7E0",
          bg: "#F7F6F2",
          card: "#FFFFFF",
        },
      },
      fontFamily: {
        serif: ["var(--font-garamond)", "Cormorant Garamond", "EB Garamond", "serif"],
        sans: ["var(--font-manrope)", "Manrope", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem", // 4px
        sm: "0.125rem",     // 2px
        md: "0.375rem",     // 6px
        lg: "0.5rem",       // 8px
        xl: "0.75rem",      // 12px
        "2xl": "1rem",      // 16px
        full: "9999px",
      },
      boxShadow: {
        ambient: "0 12px 32px -4px rgba(48, 37, 31, 0.06)",
        card: "0 1px 3px rgba(48, 37, 31, 0.04), 0 1px 2px rgba(48, 37, 31, 0.02)",
        drawer: "0 10px 25px -5px rgba(48, 37, 31, 0.08)",
        gold: "0 4px 20px rgba(216, 183, 126, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;

