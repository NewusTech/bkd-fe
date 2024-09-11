import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          "10": "#EBF1FF",
          "20": "#AFC9FF",
          "30": "#74A1FF",
          "40": "#3572EF",
          "50": "#1F56C6",
          "60": "#0F3D9D",
          "70": "#032975",
          "80": "#00194C",
        },
        secondary: {
          "10": "#FFF0EB",
          "20": "#FFC2AF",
          "30": "#FF9573",
          "40": "#FC6736",
          "50": "#D34C20",
          "60": "#AA350F",
          "70": "#822203",
          "80": "#591600",
        },
        black: {
          "10": "#D1D1D1",
          "20": "#B0B0B0",
          "30": "#888888",
          "40": "#6D6D6D",
          "50": "#5D5D5D",
          "60": "#4F4F4F",
          "70": "#454545",
          "80": "#3D3D3D",
        },
        background: {
          "10": "#FBFBFB",
          "20": "#E1DDDD",
          "30": "#C8C0C0",
          "40": "#AEA4A4",
          "50": "#958989",
          "60": "#7C6F6F",
          "70": "#625656",
          "80": "#493E3E",
        },
        line: {
          "10": "#FFFFFF",
          "20": "#E4E4E7",
          "30": "#C7C7CD",
          "40": "#AAAAB4",
          "50": "#8F8F9A",
          "60": "#757581",
          "70": "#5C5C68",
          "80": "#44444E",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;