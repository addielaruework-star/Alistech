import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ["var(--font-sora)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        bg: {
          primary: "var(--bg)",
          secondary: "var(--bg-2)",
          card: "var(--surface)",
        },
        surface: "var(--surface)",
        ink: "var(--ink)",
        mute: "var(--mute)",
        line: "var(--line)",
        acc2: {
          DEFAULT: "var(--acc2)",
          soft: "var(--acc2-soft)",
          on: "var(--on-acc2)",
        },
        acc3: {
          soft: "var(--acc3-soft)",
        },
        label: "var(--label)",
        dark: {
          DEFAULT: "var(--dark)",
          2: "var(--dark-2)",
          on: "var(--on-dark)",
          mute: "var(--mute-dark)",
        },
        accent: {
          lime: "#84cc16",
          "lime-light": "#bef264",
          slate: "#334155",
          blue: "#334155",
          "blue-light": "#84cc16",
          cyan: "#4d7c0f",
        },
        border: {
          DEFAULT: "var(--line)",
          hover: "var(--acc2)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "lime-glow":
          "radial-gradient(ellipse at center, rgba(132,204,22,0.18) 0%, transparent 70%)",
        "blue-glow":
          "radial-gradient(ellipse at center, rgba(132,204,22,0.18) 0%, transparent 70%)",
        "hero-grid":
          "linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        "glow-lime": "0 0 40px rgba(132,204,22,0.25)",
        "glow-blue": "0 0 40px rgba(132,204,22,0.25)",
        "glow-blue-sm": "0 0 20px rgba(132,204,22,0.15)",
        card: "0 22px 44px -24px rgba(132,204,22,0.35), 0 2px 6px rgba(0,0,0,0.05)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease forwards",
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
