/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#0A1628',
        surface: '#111827',
        'input-bg': '#0D1E38',
        'border-dark': '#1A2540',
        silver: {
          DEFAULT: '#CBD5E1',
          light: '#E2E8F0',
        },
        text: {
          primary: '#F5F5F5',
          secondary: '#8B9BAE',
        },
      },
      fontFamily: {
        grotesk: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        pill: '20px',
        card: '12px',
      },
      spacing: {
        '18': '72px',
        '22': '88px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
