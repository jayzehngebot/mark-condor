import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: "#fff",
      black: "#000",
      primary: "#000",
      secondary: "#fff",
      medium: "#c9c9c9",
      slate: "#64748b",
      grey: "#f1f5f9",
      "slate-100": "#1e293b",
      "slate-200": "#f1f5f9",
      "slate-300": "#e2e8f0",
      "slate-400": "#cbd5e1",
      "slate-500": "#94a3b8",
      "slate-600": "#64748b",
      "slate-700": "#475569",
      "slate-800": "#334155",
      "slate-900": "#1e293b",
    },
    extend: {
      screens: {
        xlg: "1280px",
      },
      maxWidth: {
        '7xl': '60rem', // Defines the max-width for 7xl as 80rem (1280px)
        '6xl': '50rem', // Defines the max-width for 8xl as 80rem (1280px)
        '2xl': '40rem', // Defines the max-width for 2xl as 40rem (640px)
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
