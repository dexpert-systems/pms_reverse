/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pms/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        ink: {
          950: '#05070d',
          900: '#0a0e1a',
          800: '#0f1424',
          700: '#161c30',
          600: '#1f2740',
          500: '#2a3354',
        },
        ocean: {
          50:  '#eaf4ff',
          100: '#cfe5ff',
          200: '#a3cfff',
          300: '#6cb0ff',
          400: '#3a8eff',
          500: '#1a6cf5',
          600: '#0d52d4',
          700: '#0a3fa3',
          800: '#0a2f78',
          900: '#091f4f',
        },
        cyan2: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        gold: {
          400: '#f5c451',
          500: '#e6a82e',
        },
      },
      backgroundImage: {
        'grad-ocean': 'linear-gradient(135deg, #091f4f 0%, #0a3fa3 50%, #1a6cf5 100%)',
        'grad-night': 'linear-gradient(180deg, #05070d 0%, #0a0e1a 60%, #0f1424 100%)',
        'grad-danger': 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #ef4444 100%)',
        'grad-success': 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #10b981 100%)',
        'grad-gold':   'linear-gradient(135deg, #92400e 0%, #b45309 50%, #f5c451 100%)',
        'grid-faint':
          'linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 24px -4px rgba(34, 211, 238, 0.55)',
        'glow-red': '0 0 24px -4px rgba(239, 68, 68, 0.6)',
        'glow-green': '0 0 24px -4px rgba(16, 185, 129, 0.55)',
        elevated: '0 20px 50px -20px rgba(0,0,0,0.5)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        ping2: {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '80%, 100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-3px)' },
        },
        sweep: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pop: {
          '0%': { transform: 'scale(.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.4s linear infinite',
        ping2: 'ping2 1.6s cubic-bezier(0,0,0.2,1) infinite',
        floaty: 'floaty 3s ease-in-out infinite',
        sweep: 'sweep 2.2s linear infinite',
        pop: 'pop .25s ease-out both',
      },
    },
  },
  plugins: [],
}
