module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'remotely-pattern': "url('./assets/img/Texture.png')",
      }),
      inset: {
        '18': '4.5rem',
        '20': '5rem',
        '22': '5.5rem',
        '24': '6rem',
        '26': '6.5rem',
      },
      fontFamily: {
        'comfoorta': 'Comfortaa, cursive',
        'lexend': 'Lexend Deca, sans-serif',
      },
      fontSize: {
        'xsm': '.5625rem',
      },
      zIndex: {
        '60': 60,
        '70': 70,
        '80': 80,
        '90': 90,
        '100': 100,
      },
      maxHeight: {
        '84': '21rem',
        '88': '22rem',
        '92': '23rem',
        '100': '25rem',
        '102': '25.5rem',
        '104': '26rem',
        '106': '26.5rem',
        '108': '27rem',
        '109': '27.5rem',
        '110': '28rem',
      },
      minHeight: {
        '12': '3rem',
        '14': '3.5rem',
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
        '40': '10rem',
        '44': '11rem',
        '48': '12rem',
        '52': '13rem',
        '56': '14rem',
      },
      minWidth: {
        '14': '3.5rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '32': '8rem',
        'screen': '100vw'
      },
      height: {
        '84': '21rem',
        '88': '22rem',
        '92': '23rem',
        '100': '25rem',
        '102': '25.5rem',
        '104': '26rem',
        '106': '26.5rem',
        '108': '27rem',
        '109': '27.5rem',
        '110': '28rem',
      },
      width: {
        '104': '26rem',
        '106': '26.5rem',
        '108': '27rem',
        '109': '27.5rem',
        '110': '28rem',
      },
      colors: {
        'input': '#E2E2FF',
        'primary': '#8988FD',
        // 'primary': '#4F4DB0',
        'input-text': '#A8A8D3',
        'input-disabled': '#9797C2',
        'title': '#58588B',
        'light-purple': '#E7E7FF',
        // 'medium-purple': '#AEAEFF',
        'medium-purple': '#AEAEFF',
        'medium-dark-purple': '#6262A2',
        'ice': '#FAFAFF',
        'success': '#7CFCAF',
        'error': '#FCA7A2',
        'skin': '#4F4DB0',
        'dark-light': '#3B3B52',
        'dark': "#2A2A41"
      },
      animation: {
        'spin-once': 'spino 0.5s linear forwards',
        'slide-left': 'slideLeft 0.3s forwards ease',
        'shake': 'shake 1s linear forwards',
        'fill': 'fill 1s ease forwards'
      },
      keyframes: {
        spino: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        slideLeft: {
          from: { opacity: 0, transform: 'translate3d(-100%, 0, 0)' },
          to: { opacity: 1, transform: 'none' },
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
