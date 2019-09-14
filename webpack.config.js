const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const webpackConfig = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'nice-ui.min.js',
  },
  module: {
    loaders: [{
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'index'),
          path.resolve(__dirname, 'components'),
          path.resolve(__dirname, 'utils'),
        ],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(css|less)$/,
        loader: ExtractTextPlugin.extract({
          use: [{
              loader: 'css-loader'
            },
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
      filename: 'nice-ui.css',
    }),
    // 清理上一次生成的文件
    new CleanWebpackPlugin(),
    // 压缩 JS 代码
    new ParallelUglifyPlugin({
      sourceMap: true,
      uglifyJS: {
        output: {
          // 紧凑输出
          beautify: false,
          // 删除注释
          comments: false,
        },
        compress: {
          // 删除所有的 console 语句
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出现多次但是没有定义变量取引用的静态值
          reduce_vars: true,
        },
        // 支持IE8
        // ie8: true,
      }
    }),
  ]
}

module.exports = webpackConfig;
