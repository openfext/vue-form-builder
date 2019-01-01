const path = require('path')
const builderPath = path.resolve(__dirname, '../../dist/index.js')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        builder$: builderPath
      }
    }
  },
  chainWebpack: config => {
    config.module.rule('eslint').exclude.add(builderPath)
  }
}
