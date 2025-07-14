// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-asphalt": "#ECFF99",
        card: "#1C1C1C",
        dark: "#0F0F0F",
        danger: "#FF8A8A",
        muted: "#9CA3AF",
      },
    },
  },
  plugins: [],
};
