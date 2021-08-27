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
      fontSize: {
        'xsm': '.5625rem',
      },
      maxHeight: {
        '100': '25rem',
        '104': '26rem',
        '106': '26.5rem',
        '108': '27rem',
      },
      minHeight: {
        '14': '3.5rem'
      },
      height: {
        '104': '26rem',
        '106': '26.5rem',
        '108': '27rem',
      },
      colors: {
        'input': '#E2E2FF',
        'primary': '#8988FD',
        'input-text': '#A8A8D3',
        'input-disabled': '#9797C2',
        'title': '#58588B',
        'light-purple': '#E7E7FF',
        'medium-purple': '#AEAEFF',
        'medium-dark-purple': '#6262A2',
        'ice': '#FAFAFF'
      },
      animation: {
        'spin-once': 'spino 0.5s linear forwards',
        'shake': 'shake 1s linear forwards',
        'fill': 'fill 1s ease forwards'
      },
      keyframes: {
        spino: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        shake: {
          "0%": { transform: "translate(1px, 1px) rotate(0deg)" },
          "10%": { transform: "translate(-1px, -2px) rotate(-1deg)" },
          "20%": { transform: "translate(-3px, 0px) rotate(1deg)" },
          "30%": { transform: "translate(3px, 2px) rotate(0deg)" },
          "40%": { transform: "translate(1px, -1px) rotate(1deg)" },
          "50%": { transform: "translate(-1px, 2px) rotate(-1deg)" },
          "60%": { transform: "translate(-3px, 1px) rotate(0deg)" },
          "70%": { transform: "translate(3px, 1px) rotate(-1deg)" },
          "80%": { transform: "translate(-1px, -1px) rotate(1deg)" },
          "90%": { transform: "translate(1px, 2px) rotate(0deg)" },
          "100%": { transform: "translate(1px, -2px) rotate(-1deg)" },
        },
        fill:{
          "from": {fill:"transparent"},
          "to": {fill:"#6C63FF"}
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
