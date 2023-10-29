/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
  theme: {
    extend: {
      screens: {
        xsm: "420px",
        xxl: "1600px",
        xxxl: "1900px",
        touch: { raw: "(hover: none)" },
      },
    },
  },
};
