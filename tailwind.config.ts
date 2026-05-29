import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#071521',
        surface: '#10263d',
        'surface-light': '#17314d',
        card: 'rgba(16, 38, 61, 0.72)',
        primary: '#00d492',
        secondary: '#d4a84f',
        text: '#ffffff',
        muted: '#94a3b8',
        danger: '#ff6b6b',
        success: '#00d492',
        warning: '#ffb84d',
        'dark-bg': '#081B2E',
      },
      spacing: {
        '18': '4.5rem',
      },
      borderRadius: {
        '3xl': '1.875rem',
      },
      backdropBlur: {
        'xl': '1rem',
      },
      boxShadow: {
        'glow-green': '0 0 0 1px rgba(0, 212, 146, 0.1), 0 0 30px rgba(0, 212, 146, 0.14)',
        'glow-gold': '0 0 0 1px rgba(212, 168, 79, 0.1), 0 0 30px rgba(212, 168, 79, 0.14)',
        'fintech': '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
        'fintech-lg': '0 12px 40px rgba(0,0,0,0.32)',
      },
      animation: {
        pulse: 'pulse 1.6s infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.3)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
