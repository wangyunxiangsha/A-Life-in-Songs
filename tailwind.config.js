/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Noto Serif JP"', '"EB Garamond"', 'serif'],
        'display-en': ['"EB Garamond"', '"Noto Serif JP"', 'serif'],
        body: ['"Noto Sans JP"', 'Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        spring: '#FAD0C4',
        summer: '#FFD700',
        autumn: '#D35400',
        winter: '#BDC3C7',
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      keyframes: {
        "scroll-line": {
          "0%, 100%": { transform: "scaleY(0)", transformOrigin: "top" },
          "50%": { transform: "scaleY(1)", transformOrigin: "top" },
        },
      },
      animation: {
        "scroll-line": "scroll-line 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
