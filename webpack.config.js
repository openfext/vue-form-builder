const path = require('path');

module.exports = async ({ config, mode }) => {
  // alias
  config.resolve.alias['@'] = path.resolve(__dirname, '../');

  // sass-loader
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../')
  });

  // source code
  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre'
  });
  return config;
};
