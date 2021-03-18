const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
     port: 3000,
     hot: true,
     historyApiFallback: true,
     contentBase: './src'
    //  open: true
   },
   module: {
     rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          ] 
      },
     ]
   }
})