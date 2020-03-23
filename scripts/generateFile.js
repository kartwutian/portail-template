const path = require('path');
const fs = require('fs');

/**
 * 读取路径信息
 * @param {string} path 路径
 */
function getStat(filePath) {
  return new Promise(resolve => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(stats);
      }
    });
  });
}

/**
 * 创建路径
 * @param {string} dir 路径
 */
function mkdir(dir) {
  return new Promise(resolve => {
    fs.mkdir(dir, err => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
async function dirExists(dir) {
  const isExists = await getStat(dir);
  // console.log(isExists)
  // 如果该路径且不是文件，返回true
  if (isExists && isExists.isDirectory()) {
    return true;
  } else if (isExists) {
    // 如果该路径存在但是文件，返回false
    return false;
  }
  // 如果该路径不存在
  const tempDir = path.parse(dir).dir; // 拿到上级路径
  // 递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
  const status = await dirExists(tempDir);
  let mkdirStatus;
  if (status) {
    mkdirStatus = await mkdir(dir);
  }
  // console.log('do -----------------')
  return mkdirStatus;
}

const beforeGenerateFile = async filePath => {
  const isFileExist = await getStat(filePath);
  if (isFileExist) {
    // eslint-disable-next-line prefer-promise-reject-errors
    await Promise.reject({
      code: '-1',
      filePath,
      msg: '文件已存在'
    });
  } // 如果文件已经存在了，抛出错误

  const extname = path.extname(filePath);
  let basePath = filePath;
  if (extname) {
    basePath = filePath.replace(extname, '');
  }
  const filename = path.win32.basename(basePath);
  const dirname = path.dirname(basePath);

  await dirExists(dirname); // 递归创建目录
  return {
    filePath,
    basePath,
    filename,
    dirname
  };
};

/**
 * @param {filePath} 文件的绝对路径
 * @param {template} 写入文件的字符模板
 */
const generateFile = async ({ filePath, template }, rewrite = false) => {
  try {
    await beforeGenerateFile(filePath);
    fs.writeFileSync(filePath, template);
  } catch (error) {
    console.log(JSON.stringify(error));
    if (rewrite) {
      fs.writeFileSync(filePath, template);
      console.log(`${filePath} 被重写了`);
    }
  }
};

// generateFile({
//   filePath: path.resolve(__dirname, 'demo/01/test.js'),
//   template: 'var a =1'
// });
exports.getStat = getStat;
exports.mkdir = mkdir;
exports.dirExists = dirExists;
exports.beforeGenerateFile = beforeGenerateFile;
exports.generateFile = generateFile;
