const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { AutoWebPlugin } = require('web-webpack-plugin');
const serverProxy = require('./serverProxy');
const { isEmptyObject, getFirstKey } = require('./helper');

// 自动寻找 pages 目录下的所有目录，把每个目录看成一个单页应用
const autoWebPlugin = new AutoWebPlugin('src/preview', {
  // 指定 ejs 模板文件所在的文件路径
  template: 'src/template.ejs',
  templateCompiler: function(pageName, templateFulPath) {
    const ejsTemplate = fs.readFileSync(templateFulPath, {
      encoding: 'utf8',
    });

    return ejs.render(String(ejsTemplate), {
      // 传递一些公共参数到页面
      pageConfig: JSON.stringify({
        testParam: 'testParam',
      }),
    });
  },
  // 将全局样式注入页面
  preEntrys: [path.resolve(__dirname, 'src/global.less')],
  // 提取所有页面的公共代码
  commonsChunk: {
    name: 'common',
    // 3个以上页面用到就放入common
    minChunks: function(module, count) {
      return count > 2 ? 3 : 1;
    }
  },
});

const entry = autoWebPlugin.entry();

console.log(entry);

const webpackConfig = {
  entry,
	output: {
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@components': path.resolve(__dirname, 'components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@preview': path.resolve(__dirname, 'src/preview'),
      '@src': path.resolve(__dirname, 'src'),
    }
  },
  devtool: 'cheap-module-source-map',
	module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'index'),
          path.resolve(__dirname, 'components'),
          path.resolve(__dirname, 'src'),
        ],
        exclude: [path.resolve(__dirname, 'node_modules')],
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
    autoWebPlugin,
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: false,
      cwd: process.cwd(),
    }),
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: true,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({
      url: isEmptyObject(entry)
            ? 'http://127.0.0.1:7777'
            : `http://127.0.0.1:7777/${getFirstKey(entry)}.html`,
    }),
  ]
}

webpackConfig.devServer = {
  historyApiFallback: true,
  hot: true,
  progress: true,
  host: '127.0.0.1',
  port: 7777,
  proxy: serverProxy,
  inline: true,
};

module.exports = webpackConfig;