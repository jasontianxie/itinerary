 const merge = require('webpack-merge');
 const common = require('./webpack.config.common.js');
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");

 module.exports = merge(common, {
   mode: 'production',
   module:{
     rules:[
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
   plugins:[
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
   ]
 });