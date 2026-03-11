
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        foreground: '#ffffff',
        accent: '#f0f0f0',
        muted: '#666666',
      },
      fontFamily: {
        sans: ['"Neue Machina"', 'Space Grotesk', 'Inter', 'sans-serif'],
        display: ['"Neue Machina"', 'Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        tightest: '-.075em',
        tighter: '-.05em',
        widest: '.25em',
      },
    },
  },
  plugins: [],
}
export default config
