/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050508',
          900: '#0a0a10',
          800: '#12121c',
          700: '#1b1b28',
          600: '#26263a',
        },
        lime: {
          300: '#e5ff9e',
          400: '#d6fa63',
          500: '#c6f52d',
          600: '#a8d916',
        },
        neon: {
          400: '#edffa3',
          500: '#d9f96b',
        },
        mist: {
          100: '#f4f4f8',
          300: '#c9c9d6',
          400: '#9a9aad',
          500: '#6f6f85',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
}
