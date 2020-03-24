/**
 * 通用延时函数
 * @param timeout
 * @returns {Promise<any>}
 */
export const delay = (timeout = 0.3) =>
  new Promise(resolve => setTimeout(resolve, timeout * 1000));

/**
 * 讲枚举数组转化为枚举对象
 * @param arr
 * @param options {key: 'key',val: 'name'}
 * @returns {{}}
 */
export const exchangeToEnum = (
  arr = [],
  options = {
    key: 'id',
    val: 'name'
  }
) => {
  if (!Array.isArray(arr)) {
    console.error('第一个参数必须为数组');
    return {};
  }
  return arr.reduce((result, item) => {
    result[item[options.key]] = item[options.val];
    return result;
  }, {});
};
