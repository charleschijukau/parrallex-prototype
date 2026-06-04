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
        /* Parallex Brand */
        'px-blue':    { 900:'#0D1057', 800:'#141880', 700:'#1B2087', 600:'#2228A8', 500:'#2D38C4' },
        'px-gold':    { 600:'#A87830', 500:'#C9943A', 400:'#D4A84F', 300:'#E2BE7A' },
        /* Surfaces */
        background:   '#07091F',
        surface:      '#0D1040',
        'surface-mid':'#121550',
        'surface-light':'#181C62',
        /* Status */
        primary:      '#D4A84F',
        secondary:    '#2D38C4',
        muted:        '#8890C8',
        danger:       '#EF4444',
        success:      '#22C55E',
        warning:      '#F59E0B',
        info:         '#3B82F6',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '22px',
        '4xl': '28px',
      },
      boxShadow: {
        'gold':    '0 0 0 1px rgba(201,148,58,0.18), 0 8px 32px rgba(201,148,58,0.10)',
        'blue':    '0 0 0 1px rgba(27,32,135,0.30), 0 8px 32px rgba(7,9,31,0.60)',
        'card':    '0 8px 40px rgba(0,0,0,0.50)',
        'glow-gold':  '0 0 0 1px rgba(201,148,58,0.14), 0 0 28px rgba(201,148,58,0.12)',
        'glow-green': '0 0 0 1px rgba(34,197,94,0.12), 0 0 28px rgba(34,197,94,0.12)',
      },
      animation: {
        'live-pulse': 'livePulse 1.8s ease-in-out infinite',
        'fade-up':    'fadeUp 0.38s cubic-bezier(0.22,1,0.36,1) both',
        'slide-in':   'slideIn 0.28s cubic-bezier(0.22,1,0.36,1) both',
        'spin-slow':  'spin 0.75s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config