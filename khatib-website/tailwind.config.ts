import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary — Deep Navy
        'deep-navy': '#0A0E17',
        navy: '#0F1A2E',
        midnight: '#1A2640',
        // Secondary — Gold
        gold: '#C8A44E',
        'gold-light': '#D4B76A',
        'gold-dark': '#A68A3E',
        // Tertiary — Heritage Green
        'heritage-green': '#1A4D2E',
        'green-light': '#2A6B40',
        'green-dark': '#0F3A1F',
        // Tertiary — Blueprint Blue
        'blueprint-blue': '#2E5E8B',
        'blueprint-light': '#5A8AB8',
        'blueprint-dark': '#1F4567',
        // Neutrals
        cream: '#F5F1E8',
        'warm-gray': '#9A9589',
        stone: '#5A5651',
        // Functional
        success: '#2A6B40',
        warning: '#C8A44E',
        danger: '#8B2020',
        info: '#2E5E8B',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-plex-sans)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-plex-arabic)', 'Tahoma', 'Arial', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'Menlo', 'Courier New', 'monospace'],
      },
      letterSpacing: {
        tracked: '0.16em',
        'tracked-wide': '0.24em',
      },
      maxWidth: {
        prose: '68ch',
        narrow: '52ch',
      },
    },
  },
  plugins: [],
};

export default config;
