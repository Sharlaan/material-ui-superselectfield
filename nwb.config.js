const path = require('path')

module.exports = {
  polyfill: false,
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false
  },
  webpack: {
    aliases: {
      'material-ui-superselectfield': path.resolve('src')
    }
  }
}
