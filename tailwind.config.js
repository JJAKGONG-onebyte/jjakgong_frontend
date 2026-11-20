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
          70: "#ABABB6",
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
        base: ["32px", { lineHeight: "43.2px", letterSpacing: "-0.015em" }],
        body: ["24px", { lineHeight: "33.6px", letterSpacing: "-0.01em" }],
        small: ["18px", { lineHeight: "27px", letterSpacing: "-0.005em" }],
        caption: ["14px", { lineHeight: "21px", letterSpacing: "0em" }],
      },

      boxShadow: {
        50: "0 0 10px rgba(43, 82, 255, 0.5)",
      },

      // 가로 중앙 정렬(-50%)을 유지한 채 아래에서 올라오는 토스트 등장 효과
      keyframes: {
        "toast-in": {
          from: { opacity: "0", transform: "translate(-50%, 16px)" },
          to: { opacity: "1", transform: "translate(-50%, 0)" },
        },
        // 캐릭터 말풍선이 바뀔 때 톡 튀어나오는 효과
        "bubble-pop": {
          "0%": { opacity: "0", transform: "scale(0.6)" },
          "70%": { opacity: "1", transform: "scale(1.06)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "toast-in": "toast-in 0.3s ease-out both",
        "bubble-pop": "bubble-pop 0.35s ease-out both",
      },
    },
  },
  plugins: [],
};