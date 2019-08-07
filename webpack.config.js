const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackConfig = {
  entry: path.resolve(__dirname, 'index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
    filename: 'nice-ui.js',
  },
	module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'components'),
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test:/\.(css|less)$/,
        loader: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader' },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true
              }
            },
          ],
          fallback: 'style-loader',
        }),
        exclude: '/node_modules/',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1024 * 10, // 10k以下编译成base64
          name: 'img/[name]_[hash:6].[ext]',
        }
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        loader: 'file-loader',
      }
    ]
  },
	plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new ExtractTextPlugin({
      filename: '[name].css',
    }),
  ]
}

module.exports = webpackConfig;
