import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		maxWidth: {
  			container: "1280px",
  		},
  		animation: {
  			marquee: "marquee var(--duration) linear infinite",
  			"shimmer-slide": "shimmer-slide var(--speed, 3s) ease-in-out infinite",
  			"spin-around": "spin-around var(--speed, 3s) linear infinite",
  			"background-gradient":
  				"background-gradient var(--background-gradient-speed, 15s) cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite",
  		},
  		keyframes: {
  			marquee: {
  				from: { transform: "translateX(0)" },
  				to: { transform: "translateX(calc(-100% - var(--gap)))" },
  			},
  			"shimmer-slide": {
  				"0%": { transform: "translateX(-100%) translateY(-100%)" },
  				"100%": { transform: "translateX(100%) translateY(100%)" },
  			},
  			"spin-around": {
  				"0%": { transform: "rotate(0deg)" },
  				"100%": { transform: "rotate(360deg)" },
  			},
  			"background-gradient": {
  				"0%, 100%": {
  					transform: "translate(0, 0)",
  				},
  				"20%": {
  					transform:
  						"translate(calc(100% * var(--tx-1, 1)), calc(100% * var(--ty-1, 1)))",
  				},
  				"40%": {
  					transform:
  						"translate(calc(100% * var(--tx-2, -1)), calc(100% * var(--ty-2, 1)))",
  				},
  				"60%": {
  					transform:
  						"translate(calc(100% * var(--tx-3, 1)), calc(100% * var(--ty-3, -1)))",
  				},
  				"80%": {
  					transform:
  						"translate(calc(100% * var(--tx-4, -1)), calc(100% * var(--ty-4, -1)))",
  				},
  			},
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-geist-sans)',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'var(--font-geist-mono)',
  				'monospace'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			card: {
  				DEFAULT: 'var(--card)',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'var(--muted)',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'var(--accent)',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'var(--border)',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
