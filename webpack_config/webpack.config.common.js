const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const extractSass = new ExtractTextPlugin('style.css');

module.exports = {
  entry: {
    app: ['./src/index.tsx', 'webpack-hot-middleware/client?reload=true']
  },
  resolve:{
    extensions:['.tsx','.ts','.json','.js','.jsx','.scss']
  },
  module: {
    rules: [
      // {
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['env', 'react']
      //     }
      //   }
      // },
      { test: /\.tsx?$/,use: [{loader: "babel-loader"},{loader: "awesome-typescript-loader"}] },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     "style-loader", // creates style nodes from JS strings
      //     "css-loader", // translates CSS into CommonJS
      //     "sass-loader" // compiles Sass to CSS, using Node Sass by default
      //   ]
      // },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 81920
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options:{
          symbolId: (p) => p
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            query: {
                modules: true,
                importLoaders: 1,
                localIdentName: "[path]-[name]-[local]-[hash:base64:6]",
                minimize: false,
                sourceMap: true,
            },
        },
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/*.*'], { root: path.resolve(__dirname, '..'), watch: true }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'index',
      template: './src/templates/index.html'
    }),
    new BrowserSyncPlugin(
      // BrowserSync options
      {
        // browse to http://localhost:3000/ during development
        host: 'localhost',
        port: 3001,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:3100/)
        // through BrowserSync
        proxy: 'http://localhost:3000/'
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
      }
    ),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  }
};