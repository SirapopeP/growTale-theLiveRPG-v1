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
      {
        growtale: {
          "primary": "#3b82f6",
          "secondary": "#8b5cf6", 
          "accent": "#f59e0b",
          "neutral": "#374151",
          "base-100": "#ffffff",
          "base-200": "#f3f4f6",
          "base-300": "#e5e7eb",
          "info": "#3b82f6",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
      "light",
      "dark",
    ],
  },
};

export default config;
