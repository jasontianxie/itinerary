 const merge = require('webpack-merge');
 const common = require('./webpack.config.common.js');
 const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
 const webpack = require('webpack');

 module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   module:{
     rules:[
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
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
    new webpack.HotModuleReplacementPlugin(),
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
    )
   ]
 });