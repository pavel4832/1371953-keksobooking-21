const path = require(`path`);

module.exports = {
  entry: [
    `./js/util.js`,
    `./js/backend.js`,
    `./js/pin.js`,
    `./js/card.js`,
    `./js/map.js`,
    `./js/form.js`,
    `./js/drag.js`,
    `./js/debounce.js`,
    `./js/filter.js`,
    `./js/page.js`,
    `.js/main.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
