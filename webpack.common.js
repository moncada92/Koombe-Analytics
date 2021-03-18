const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    index: path.resolve(__dirname,'src/js/index.js')
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  module:{
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
        use: {
          loader: 'url-loader',
          options: {
            encoding: 'base64',
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Analitycs',
      template: path.resolve(__dirname, './src/index.html'),
      minify: false,
    }),
    new Dotenv({
      path: './.env.development',
      safe: true 
    })
  ]
}