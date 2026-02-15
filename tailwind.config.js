/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        pastel: {
          blue: "hsl(var(--pastel-blue))",
          blueForeground: "hsl(var(--pastel-blue-foreground))",
          peach: "hsl(var(--pastel-peach))",
          peachForeground: "hsl(var(--pastel-peach-foreground))",
          mint: "hsl(var(--pastel-mint))",
          mintForeground: "hsl(var(--pastel-mint-foreground))",
          lilac: "hsl(var(--pastel-lilac))",
          lilacForeground: "hsl(var(--pastel-lilac-foreground))",
          rose: "hsl(var(--pastel-rose))",
          roseForeground: "hsl(var(--pastel-rose-foreground))",
          orange: "hsl(var(--pastel-orange))",
          orangeForeground: "hsl(var(--pastel-orange-foreground))",
        },
        risk: {
          low: "hsl(var(--risk-low))",
          lowForeground: "hsl(var(--risk-low-foreground))",
          medium: "hsl(var(--risk-medium))",
          mediumForeground: "hsl(var(--risk-medium-foreground))",
          high: "hsl(var(--risk-high))",
          highForeground: "hsl(var(--risk-high-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
