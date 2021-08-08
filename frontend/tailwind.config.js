module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'remotely-pattern': "url('./assets/img/Texture.png')",
      }),
      fontFamily: {
        'comfoorta': 'Comfortaa, cursive',
        'lexend': 'Lexend Deca, sans-serif',
      },
      colors: {
        'input': '#E2E2FF',
        'primary': '#8988FD',
        'input-text': '#A8A8D3',
        'title': '#58588B',
        'light-purple': '#E7E7FF',
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
