import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        heading: ["DM Sans", "sans-serif"],
        display: ["DM Serif Display", "Georgia", "serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          900: "hsl(var(--primary-900))",
          800: "hsl(var(--primary-800))",
          700: "hsl(var(--primary-700))",
          600: "hsl(var(--primary-600))",
          500: "hsl(var(--primary-500))",
          400: "hsl(var(--primary-400))",
          100: "hsl(var(--primary-100))",
          50: "hsl(var(--primary-50))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        neutral: {
          900: "hsl(var(--neutral-900))",
          700: "hsl(var(--neutral-700))",
          600: "hsl(var(--neutral-600))",
          500: "hsl(var(--neutral-500))",
          400: "hsl(var(--neutral-400))",
          300: "hsl(var(--neutral-300))",
          200: "hsl(var(--neutral-200))",
          100: "hsl(var(--neutral-100))",
          50: "hsl(var(--neutral-50))",
        },
        success: {
          700: "hsl(var(--success-700))",
          500: "hsl(var(--success-500))",
          100: "hsl(var(--success-100))",
          50: "hsl(var(--success-50))",
        },
        warning: {
          700: "hsl(var(--warning-700))",
          500: "hsl(var(--warning-500))",
          400: "hsl(var(--warning-400))",
          100: "hsl(var(--warning-100))",
          50: "hsl(var(--warning-50))",
        },
        danger: {
          700: "hsl(var(--danger-700))",
          500: "hsl(var(--danger-500))",
          400: "hsl(var(--danger-400))",
          100: "hsl(var(--danger-100))",
          50: "hsl(var(--danger-50))",
        },
        info: {
          500: "hsl(var(--info-500))",
          100: "hsl(var(--info-100))",
        },
        orange: {
          500: "hsl(var(--orange-500))",
          100: "hsl(var(--orange-100))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        focus: "var(--shadow-focus)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "count-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "count-up": "count-up 0.6s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
