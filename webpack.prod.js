const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');


module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'js/[chunkhash][name].js',
    publicPath: './'
  },
  module:{
    rules: [
      {
        test: /\.scss$/i,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.css$/i,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
        ]
      },
    ],
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'css/[chunkhash][name].css',
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'src/img', to: 'img' },
      ],
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
  },
});

