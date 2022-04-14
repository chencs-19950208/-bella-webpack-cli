const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const variable = require('./utils/variable');
const resolveConfig = require('./utils/resolve');
const plugins = require('./utils/plugins');
const { SRC_PATH, DIST_PATH, IS_DEV, IS_PRO, getCDNPath } = variable;

// webpack 通用配置
const config = {
  entry: {
    index: path.join(SRC_PATH, 'index.tsx'),
  },
  output: {
    path: DIST_PATH,
    filename: IS_DEV ? 'js/[name].bundle.js' : 'js/[name].[contenthash:8].bundle.js',
    publicPath: getCDNPath(),
    globalObject: 'this',
    chunkFilename: IS_DEV ? 'js/[name].chunk.js' : 'js/[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },

  // loader的执行顺序默认从右到左，多个loaders 用[], 字符串只用一个loader， 也可以是对象的格式
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        include: [SRC_PATH],
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: require('os').cpus().length * 2,
              parallel: true,
            },
          },
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: false,
              plugins: [
                IS_DEV && ['react-refresh/babel', { skipEnvCheck: true }],
                //  给antd做按需加载
                [
                  'import',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: 'css', // `style: true` 会加载 less 文件
                  },
                ],
              ].filter(Boolean),
            },
          },
        ],
        exclude: [/node_modules/, /public/, /(.|_)min\.js$/],
      },
      {
        test: /\.(css|less)$/,
        include: [SRC_PATH],
        exclude: /node_modules|antd/,
        use: [
          IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: !IS_PRO,
            },
          },
          'postcss-loader',
          'less-loader',
          {
            loader: 'style-resources-loader',
            options: {
              patterns: path.resolve(SRC_PATH, 'assets', 'css', 'core.less'),
            },
          },
        ],
      },
      {
        //  专门处理antd的less样式 需要编译
        test: /\.(css|less)$/,
        include: /node_modules|antd\.css/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]',
        },
      },
    ],
  },
  resolve: resolveConfig,
  plugins: plugins.getPlugins(),
};

module.exports = config;
