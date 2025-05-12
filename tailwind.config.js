/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // These will reference your CSS variables for consistent theming
        "text-headings": "var(--text-headings)",
        "text-body": "var(--text-body)",
        "text-secondary": "var(--text-secondary)",
        "text-highlight": "var(--text-highlight)",
        "bg-highlight": "var(--bg-highlight)",
        "bg-sosmed": "var(--bg-sosmed)",
        "bg-sosmed-middle": "var(--bg-sosmed-middle)",
      },
      spacing: {
        128: "128px",
        40: "40px",
      },
      fontFamily: {
        base: "var(--base-font)",
      },
      fontSize: {
        heading1: [
          "36px",
          {
            lineHeight: "49px",
            letterSpacing: "-0.025em",
            fontWeight: "700",
          },
        ],
        "heading1-mobile": [
          "32px",
          {
            lineHeight: "36px",
            letterSpacing: "-0.025em",
            fontWeight: "700",
          },
        ],
        paragraph: [
          "18px",
          {
            lineHeight: "31px",
            fontWeight: "400",
          },
        ],
        "paragraph-mobile": [
          "16px",
          {
            lineHeight: "28px",
            fontWeight: "400",
          },
        ],
      },
      borderRadius: {
        sosmed: "0px",
      },
      boxShadow: {
        sosmed: "2px 4px 12px 0px rgba(0, 0, 0, 0.1)",
        "sosmed-active": "2px 4px 12px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  // This ensures Tailwind doesn't override your existing styles
  corePlugins: {
    preflight: false,
  },
};
