const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve:{
    extensions:['.tsx','.ts','.json','.js','.jsx','.scss']
  },
  externals:{'BMap':'BMap'},
  module: {
    rules: [
      { test: /\.tsx?$/,use: [{loader: "babel-loader"},{loader: "awesome-typescript-loader"}] },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 81920
            }
          }
        ]
      },{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options:{
          symbolId: '[folder]-[name]'
        }
      },
      {
        test: /(\.noneModules.css|antd.*\.css|react-draft-wysiwyg\.css)$/,
        use: [{loader:'style-loader'},{loader:'css-loader'}],
        
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/*.*'], { root: path.resolve(__dirname, '..'), watch: true }),
    new HtmlWebpackPlugin({
      title: '主页',
      template: './src/templates/index.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename:'bundle.[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  }
};