import { heroui } from '@heroui/theme'
import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-robote)', 'var(--font-noto-sans-sc)'],
        mono: ['var(--font-jetbrains-mono)', ...defaultTheme.fontFamily.mono],
        'noto-sans-sc': ['var(--font-noto-sans-sc)'],
        'poller-one': ['var(--font-poller-one)'],
      },
      colors: {
        // Design System — Modality colors
        'ds-green': 'var(--ds-green)',
        'ds-green-s': 'var(--ds-green-s)',
        'ds-blue': 'var(--ds-blue)',
        'ds-blue-s': 'var(--ds-blue-s)',
        'ds-pink': 'var(--ds-pink)',
        'ds-pink-s': 'var(--ds-pink-s)',
        'ds-yellow': 'var(--ds-yellow)',
        'ds-yellow-s': 'var(--ds-yellow-s)',

        // Design System — Neutral scale
        'ds-gray': {
          50: 'var(--ds-g50)',
          100: 'var(--ds-g100)',
          200: 'var(--ds-g200)',
          300: 'var(--ds-g300)',
          400: 'var(--ds-g400)',
          500: 'var(--ds-g500)',
          600: 'var(--ds-g600)',
          700: 'var(--ds-g700)',
          800: 'var(--ds-g800)',
          900: 'var(--ds-g900)',
        },

        // Design System — Surfaces & Backgrounds
        'ds-page-bg': 'var(--ds-page-bg)',
        'ds-page-bg-2': 'var(--ds-page-bg-2)',
        'ds-surface': 'var(--ds-surface)',
        'ds-surface-soft': 'var(--ds-surface-soft)',
        'ds-ink': 'var(--ds-ink)',
        'ds-agent-ink': 'var(--ds-agent-ink)',
        'ds-ink-hover': 'var(--ds-ink-hover)',

        // Design System — Utility
        'ds-amber': 'var(--ds-amber)',
        'ds-red': 'var(--ds-red)',

        // Legacy aliases (transition period)
        'theme-green': 'var(--ds-green)',
        'theme-pink': 'var(--ds-pink)',

        // shadcn compat layer
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'rgba(0,0,0,0.1)',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      boxShadow: {
        'custom-1': '0px 10px 10px -5px #0000000A',
        'custom-2': '0px 20px 25px -5px #0000001A',
        // Design System shadows
        'ds-0': 'var(--ds-shadow-0)',
        'ds-1': 'var(--ds-shadow-1)',
        'ds-2': 'var(--ds-shadow-2)',
        'ds-3': 'var(--ds-shadow-3)',
        'ds-4': 'var(--ds-shadow-4)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        // Design System radii
        'ds-xs': '4px',
        'ds-sm': '8px',
        'ds-md': '12px',
        'ds-lg': '16px',
        'ds-xl': '20px',
        'ds-pill': '999px',
      },
      animation: {
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        shine: 'shine var(--duration) infinite linear',
        breatheScale: 'breatheScale 2s ease-in-out infinite',
        customPulse: 'customPulse var(--duration) ease-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        float: 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 10s linear infinite',
        glitch: 'glitch 1s linear infinite',
        blink: 'blink 1s step-end infinite',
        'draw-check': 'draw-check 0.4s ease-out 0.2s forwards',
      },
      keyframes: {
        'draw-check': {
          '0%': { 'stroke-dashoffset': '30' },
          '100%': { 'stroke-dashoffset': '0' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glitch: {
          '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
          '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
          '62%': { transform: 'translate(0,0) skew(5deg)' },
        },
        breatheScale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { 'background-position': '200% 0' },
          '100%': { 'background-position': '-200% 0' },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
        customPulse: {
          '0%, 100%': {
            boxShadow: '0 0 0 0 var(--pulse-color)',
          },
          '50%': {
            boxShadow: '0 0 0 8px var(--pulse-color)',
          },
        },
        shine: {
          '0%': {
            'background-position': '0% 0%',
          },
          '50%': {
            'background-position': '100% 100%',
          },
          to: {
            'background-position': '0% 0%',
          },
        },
      },
    },
  },
  plugins: [animate, typography, heroui()] as NonNullable<Config['plugins']>,
} satisfies Config
