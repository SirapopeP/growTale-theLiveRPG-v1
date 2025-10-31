import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      borderRadius: {
        'lg': '0.625rem',
        'xl': '0.875rem',
      },
      transitionTimingFunction: {
        'emphasized': 'cubic-bezier(0.2, 0, 0, 1)',
      },
      transitionDuration: {
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
      },
      boxShadow: {
        'elev-1': '0 4px 14px rgba(0,0,0,0.06)',
        'elev-2': '0 10px 25px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      // Light theme mapped to provided palette
      {
        light: {
          // Surfaces
          "base-100": "#FFFFFF", // space/surface
          "base-200": "#F4FBF8", // soft background
          "base-300": "#E6F3ED", // borders/dividers
          "base-content": "#5D776B", // main text

          // Brand
          primary: "#90E9C0",
          "primary-content": "#355C4F",
          secondary: "#60947C",
          "secondary-content": "#FFFFFF",
          accent: "#90E9C0",

          // Others
          neutral: "#5D776B",
          "neutral-content": "#FFFFFF",
          info: "#3b82f6",
          success: "#16a34a",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
      // Dark theme mapped to provided palette
      {
        dark: {
          // Surfaces
          "base-100": "#363636",
          "base-200": "#2B2B2B",
          "base-300": "#404040",
          "base-content": "#C6E9D9", // main text

          // Brand
          primary: "#90E9C0",
          "primary-content": "#1C2E28",
          secondary: "#60947C",
          "secondary-content": "#FFFFFF",
          accent: "#90E9C0",

          // Others
          neutral: "#C6E9D9",
          "neutral-content": "#1C2E28",
          info: "#93c5fd",
          success: "#22c55e",
          warning: "#fbbf24",
          error: "#f87171",
        },
      },
    ],
  },
};

export default config;
