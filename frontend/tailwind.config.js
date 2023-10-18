/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        veterinaria: {
          primary: "#FFFFFF",
          "primary-content": "#1D2939",
          secondary: "#FFFAF5",
          accent: "#FF5B2E",
          "accent-content": "#FFFFFF",
          neutral: "#2b3440",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#C02222",
        },
      },
      "light",
      "dark",
      "cupcake",
    ],
  },
  theme: {
    extend: {
      borderRadius: {
        custom: "0px 30px 0px 30px",
      },
      fontFamily: {
        title: ["var(--font-secular)", "sans-serif"],
        text: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
