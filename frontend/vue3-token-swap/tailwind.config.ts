import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#14294D',
      },
    },
  },
  plugins: [],
} satisfies Config
