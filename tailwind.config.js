const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: {
          100: "#F8F9FA",
          90: "#DDDDE6",
          80: "#BEBEC8",
          70: "#8E8E98",
          60: "#797980",
          10: "#0D0D0D",
        },
        primary: {
          10: "#2B52FF",
          90: "#F4F6FF",
        },
        sec: {
          80: "#FFC3EA",
        },
        ter: {
          80: "#F5383B",
          90: "#0AE1DA",
        },
        gradient: {
          1: "#95A8FF",
          3: "#EAEEFF",
        },
      },

      fontFamily: {
        sans: ['"Pretendard Variable"', "Pretendard", ...defaultTheme.fontFamily.sans],
      },

      fontSize: {
        extralarge: ["64px", { lineHeight: "76.8px", letterSpacing: "-0.02em" }],
        large: ["48px", { lineHeight: "60px", letterSpacing: "-0.02em" }],
        base: ["32px", { lineHeight: "43.2px", letterSpacing: "-0.02em" }],
        body: ["24px", { lineHeight: "33.6px", letterSpacing: "-0.02em" }],
        small: ["18px", { lineHeight: "27px", letterSpacing: "-0.02em" }],
        caption: ["14px", { lineHeight: "21px", letterSpacing: "-0.02em" }],
      },
    },
  },
  plugins: [],
};