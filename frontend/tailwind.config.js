/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#e2dee9",
        "on-background": "#3a3445",
        primary: "#b8accf",
        secondary: "#d6cfe1",
        surface: "rgba(226, 222, 233, 0.45)",
        outline: "rgba(184, 172, 207, 0.3)",
        "primary-container": "#d0c9df",
        "on-surface": "#2d2837",
      },
      borderRadius: {
        DEFAULT: "0px",
        lg: "4px",
        xl: "8px",
        full: "9999px",
      },
      fontFamily: {
        headline: ["Epilogue"],
        body: ["Manrope"],
        label: ["Space Grotesk"],
      },
    },
  },
  plugins: [],
}
