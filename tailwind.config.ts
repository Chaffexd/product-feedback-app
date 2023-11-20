import type { Config } from "tailwindcss";
// https://stackoverflow.com/questions/64872861/how-to-use-css-variables-with-tailwind-css
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "var(--purple)",
        blue: "var(--blue)",
        navy: "var(--navy)",
        white: "var(--white)",
        grey: "var(--grey)",
        "off-white": "var(--off-white)",
        "darker-navy": "var(--darker-navy)",
        slate: "var(--slate)",
        orange: "var(--orange)",
        "baby-blue": "var(--baby-blue)",
      },
    },
  },
  plugins: [],
};
export default config;
