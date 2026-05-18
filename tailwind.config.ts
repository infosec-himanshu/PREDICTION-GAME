import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: "#00FFFF",
          pink: "#FF00FF",
          green: "#00FF00",
          purple: "#9D00FF",
          blue: "#00D9FF",
        },
        dark: {
          bg: "#0A0A0F",
          card: "#151520",
          border: "#1F1F2E",
        },
      },
      animation: {
        "pulse-neon": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px #00FFFF, 0 0 10px #00FFFF" },
          "100%": { boxShadow: "0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

