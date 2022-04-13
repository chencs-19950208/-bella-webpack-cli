const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const variable = require('./utils/variable');

const { DIST_PATH, IS_PRO } = variable;

// 引入 react-refresh 做热更新，详细可以百度 包的用法
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// dev 环境webpack 配置
const config = {
  mode: 'development',
  cache: { type: 'memory' },
  devtool: 'eval-cheap-module-source-map',
  // stats: 'errors-only',
  plugins: [!IS_PRO && new ReactRefreshWebpackPlugin()].filter(Boolean),
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000,
    ignored: /node_modules/,
  },
  devServer: {
    open: 'chrome',
    contentBase: DIST_PATH,
    compress: true, // 是否开启gzip压缩
    publicPath: '/',
    host: 'localhost',
    port: 8000,
    // hot: true,
    disableHostCheck: true,
    stats: 'errors-only',
    proxy: {},
  },
};

const mergedConfig = webpackMerge.merge(baseConfig, config);
mergedConfig.plugins = mergedConfig.plugins.filter(Boolean);

module.exports = mergedConfig;
