const webpack = require('webpack');


module.exports = {
  entry: './app/app.js',
  output: {
    path: __dirname + '/build',
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
            plugins: ['transform-object-rest-spread', 'transform-class-properties']
          }
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:8888'
    }
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
