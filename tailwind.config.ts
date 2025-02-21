import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px",
      "3xl": "1600px",
      "4xl": "1800px",
    },
    extend: {
      colors : {
        // Main brand colors
        "primary-0": "#B657FF", // Main purple brand color
        "primary-1": "#4CCBF7", // Cyan/light blue for gradients
        "primary-2": "#6E3AD3", // Secondary purple
        
        // Background colors
        "primary-4": "#0A0A0F", // Darkest background (navbar)
        "primary-5": "#13131D", // Card backgrounds
        "primary-8": "#1A1A24", // Lighter dark background
        
        // Gradient backgrounds with opacity
        "primary-6": "rgba(182, 87, 255, 0.1)", // Purple overlay
        "primary-7": "rgba(76, 203, 247, 0.1)", // Cyan overlay
        
        // UI Element colors
        "primary-9": "#9747FF", // Bright purple for active states
        "primary-10": "#2D2D3D", // Border colors
        "primary-32": "rgba(10, 10, 15, 0.32)", // Dark overlay
        
        // Structural elements
        "stroct-1": "rgba(255, 255, 255, 0.15)", // Dividers/borders
        
        // Highlight colors
        "highlight-1": "#B657FF", // Primary highlight (purple)
        "highlight-2": "#4CCBF7", // Secondary highlight (cyan)
        
        // Background system
        "BG": "#0A0A0F", // Main background
        "BG-2": "#13131D", // Secondary background
        "BG-3": "#1A1A24", // Tertiary background
        "BG-FFF-8": "rgba(255, 255, 255, 0.08)", // Subtle white overlay
        "BG-FFF-40": "rgba(255, 255, 255, 0.40)", // Text color for less emphasis
        
        // Foundation colors (for light mode/cards)
        "foundation-blue-20": "#F8F9FE",
        "foundation-blue-30": "#F0F3FC",
        "foundation-blue-40": "#E8EDFA",
        "foundation-blue-50": "#D1DEFF",
        "foundation-blue-60": "#B3C9FF",
        
        // Base colors
        "white": "#FFFFFF",
        "black": "#000000",
      },
      keyframes: {
        "bounce-slow": {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-30px)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        "spin-slow": "spin 60s linear infinite",
        "bounce-slow": "bounce-slow 5s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
