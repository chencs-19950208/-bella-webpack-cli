// 打包构建所需要通用工具方法
const fs = require('fs');
const pkgConfig = require('../../package.json');

/**
 * 读文件内容
 * @param {string} currentPath 
 * @returns 
 */
function readFile(currentPath) {
  const content = fs.readFileSync(currentPath, 'utf-8');

  return content;
};

/**
 * 获取版本
 * @returns 
 */
function getVersion() {
  return pkgConfig.version || '1.0.0'
};

/**
 *
 * 获取测试版本
 * @export
 * @returns
 */
 function getTestVersion() {
  return packageConfig.testVersion || '1.0.0';
}

/**
 *
 * 获取env
 * @returns
 */
function getEnv() {
  return process.env.NODE_ENV || 'dev';
}

module.exports = {
  readFile,
  getVersion,
  getTestVersion,
  getEnv,
};
