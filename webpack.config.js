const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { AutoWebPlugin } = require('web-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const serverProxy = require('./serverProxy');

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

// 自动寻找 pages 目录下的所有目录，把每个目录看成一个单页应用
const autoWebPlugin = new AutoWebPlugin('src/pages', {
  // 指定 ejs 模板文件所在的文件路径
  template: 'src/template.ejs',
  templateCompiler: function(pageName, templateFulPath) {
    const ejsTemplate = fs.readFileSync(templateFulPath, {
      encoding: 'utf8',
    });

    const jquery = fs.readFileSync('src/lib/jquery.min.js', {
      encoding: 'utf8',
    });

    return ejs.render(String(ejsTemplate), {
      // 传递一些公共参数到页面
      pageConfig: JSON.stringify({
        testParam: 'testParam',
      }),
      isProd,
      isDev,
      jquery,
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

const webpackConfig = {
  entry: autoWebPlugin.entry({
    base: path.resolve(__dirname, 'src/base.js'),
  }),
	output: {
		path: path.resolve(__dirname, 'dist'),
    filename: isProd ? '[name]_[hash:6].js' : '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      // '@stores': path.resolve(__dirname, 'src/stores'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    }
  },
  devtool: isProd ? '' : 'cheap-module-source-map',
	module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: ['/node_modules/', path.resolve(__dirname, 'src/lib')],
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
      filename: isProd ? '[name]_[contenthash:6].css' : '[name].css',
    }),
    new webpack.DllReferencePlugin({
      manifest: './src/static/dll/vendor.manifest.json',
      name: '_dll_vendor',
    }),
  ]
}

if (isProd) {
  webpackConfig.plugins.push(
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
  );
}

if(isDev) {
  webpackConfig.plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({
      url: 'http://127.0.0.1:9999/home.html',
    }),
  );
  webpackConfig.devServer = {
    historyApiFallback: true,
    hot: true,
    progress: true,
    host: '127.0.0.1',
    port: 9999,
    proxy: serverProxy,
    inline: true,
  };
}

module.exports = webpackConfig;
