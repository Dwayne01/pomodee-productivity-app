
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    'colors': {
      'purple': '#5D2DFF',
      'orange': '#F34506',
      'brown': '#BF8033',
    }
  },
  plugins: [
     require('flowbite/plugin')
  ],
}