// node 层处理项目的基础参数集合
const path = require('path');
const UtilsFunc = require('./utils');
const dotenv = require('dotenv');
// 注： __dirname 为当前项目的文件路径
const { config: loadConfig } = dotenv;

const NODE_ENV = UtilsFunc.getEnv();

// 构建目录
const DIST_PATH = path.resolve(__dirname, '../../', 'dist');

// 源码目录
const SRC_PATH = path.resolve(__dirname, '../../', 'src');

// public目录
const PUBLIC_PATH = path.resolve(__dirname, '../../', 'public');

//根节点目录
const ROOT_PATH = path.resolve(__dirname, '../../');

console.log(NODE_ENV, 'NODE_ENV')

// 是否生产环境
const IS_PRO = NODE_ENV === 'prod';

// 是否是开发环境
const IS_DEV = NODE_ENV === 'dev';

// 当前构建的版本
const version = UtilsFunc.getVersion();

function getCDNPath() {
  return IS_PRO ? `${process.env.CDN_PATH}/${version}/` : '/'
};

const ENV_CONFIG_PATH = path.resolve(ROOT_PATH, 'env', `${NODE_ENV}.env`);

// webpack 读取env配置
loadConfig({
  path: ENV_CONFIG_PATH
});

module.exports = {
  DIST_PATH,
  SRC_PATH,
  PUBLIC_PATH,
  ROOT_PATH,
  IS_PRO,
  IS_DEV,
  getCDNPath,
  ENV_CONFIG_PATH,
}