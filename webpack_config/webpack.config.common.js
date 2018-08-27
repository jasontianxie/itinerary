 const path = require('path');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const webpack = require('webpack');

 console.log(path.resolve(__dirname, '../dist'));
 module.exports = {
   entry: {
     app: ['./src/index.js','webpack-hot-middleware/client?reload=true']
   },
   module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','react']
          }
        }
      }
    ]
  },
   plugins: [
     new CleanWebpackPlugin(['dist/*.*'],{root:path.resolve(__dirname,'..'),watch:true}),
    new webpack.HotModuleReplacementPlugin(),
     new HtmlWebpackPlugin({
       title: 'index',
       template:'./src/templates/index.html'
     })
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, '../dist'),
     publicPath: '/'
   }
 };