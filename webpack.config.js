var path = require('path')
var webpack = require('webpack')
var bourbon = require('node-bourbon').includePaths

module.exports = {
  devtool: 'eval',
  node: {
    fs: 'empty',
    child_process: 'empty',
    readline: 'empty',
    tls: 'empty',
    bufferutil: 'empty',
    'utf-8-validate': 'empty',
    ws: 'empty'
  },
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass?includePaths[]=' + bourbon
    }]
  }
}
