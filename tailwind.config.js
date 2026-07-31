/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Poppins", "system-ui", "sans-serif"],
        display: ['"Newsreader"', "Georgia", "serif"],
        ku: ['"Noto Sans Arabic"', "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        kh: {
          bg: "#FFFFFF",
          surface: "#FAFAF8",
          ink: "#141414",
          muted: "#6B6560",
          border: "#ECEAE6",
          emerald: "#3D9970",
          mint: "#D4EDE4",
          aqua: "#E8F6F3",
        },
        pastel: {
          bg: "#F8FAFC",
          green: "#A7F3D0",
          blue: "#BFDBFE",
          pink: "#FBCFE8",
          warm: "#F5EBE4",
        },
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(15, 23, 42, 0.08)",
        card: "0 4px 24px rgba(15, 23, 42, 0.06)",
      },
    },
  },
  plugins: [],
};
