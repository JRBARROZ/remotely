module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'input': '#E2E2FF',
        'primary': '#8988FD',
        'input-text': '#A8A8D3',
        'title': '#58588B',
      },
      animation: {
        'spin-once': 'spino 0.5s linear forwards',
      },
      keyframes: {
        spino: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
