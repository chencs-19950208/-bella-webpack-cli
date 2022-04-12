const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const variable = require('./variable');
const DotEnvPlugin = require('dotenv-webpack');
const path = require('path');

// 拆出来 webpack 配置中 plugins
const { PUBLIC_PATH, ENV_CONFIG_PATH, IS_DEV } = variable;

function getHTMLPlugins() {
  const htmlPlugins = new HtmlWebpackPlugin({
    template: path.join(PUBLIC_PATH, 'index.html'),
    filename: 'index.html',
    inject: true, // true 插入body底部，head：插入head 标签， false：不生成 js文件 
    // hash: true, // 会在打包好的bundle.js后面加上hash串
    title: '',
    minify: {
      removeComments: true, // 删除注释
      collapseWhitespace: true,
      minifyCSS: true, // 压缩 html 中出现的css 代码
      minifyJS: true, // 压缩 HTML 中出现的 js 代码
    }
  });

  return [htmlPlugins];
};

function getPlugins () {
  // clean
  // const cleanPlugin = new CleanWebpackPlugin({
  //     cleanOnceBeforeBuildPatterns: ["**/*", '!dll', '!dll/*.*']
  // });

  // 处理css 
  const miniCssPlugin = new MiniCssExtractPlugin({
    filename: IS_DEV ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
    chunkFilename: IS_DEV ? 'css/[name].chunk.css' : 'css/[name].[contenthash:8].chunk.css',
    // 常遇到如下警告，Conflicting order. Following module has been added:…。
    // 此警告意思为在不同的js中引用相同的css时，先后顺序不一致。也就是说，在1.js中先后引入a.css和b.css，而在2.js中引入的却是b.css和a.css，此时会有这个warning。
    ignoreOrder: true
  });

  const dotenvPlugin = new DotEnvPlugin({
    path: ENV_CONFIG_PATH,
  });

  // const copyPlugin=new CopyPlugin({
  //   patterns: [
  //     { from: path.resolve(SRC_PATH,"assets"), to: path.resolve(DIST_PATH,"assets") },
  //   ],
  // });

  return [
    ...getHTMLPlugins(),
    dotenvPlugin,
    miniCssPlugin
  ];
};

module.exports = {
  getPlugins
}
