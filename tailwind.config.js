/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        zen: {
          dusk: '#0d1224',
          teal: '#22d3ee',
          moss: '#22c55e',
          sand: '#f4f1eb',
        },
      },
      backgroundImage: {
        'grid-glow':
          'radial-gradient(circle at 20% 20%, rgba(34,211,238,0.15), transparent 25%), radial-gradient(circle at 80% 0%, rgba(94,234,212,0.2), transparent 25%), radial-gradient(circle at 50% 50%, rgba(59,130,246,0.15), transparent 35%)',
      },
      boxShadow: {
        glass: '0 25px 80px rgba(15,23,42,0.35)',
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-in-out',
        pulseSoft: 'pulseSoft 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
