const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: true,
  theme: {
    colors: {
      transparent: 'transparent',
      'pomodee-purple': {
        100: '#3928b1'
      },
      'pomodee-orange': {
        100: '#F34506'
      },
      'pomodee-brown': {
        100: '#BF8033'
      },
    },
    screens: {
      xs: '200px',
      md: '800px',
      ...defaultTheme.screens,
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}