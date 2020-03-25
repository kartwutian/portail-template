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
    val: 'name',
  },
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

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

export function isArray(obj) {
  return Array.isArray(obj);
}

export function isFuc(f) {
  return typeof f === 'function';
}

/**
 * 是否为服务端
 */
export function isServer() {
  return typeof window === 'undefined';
}

/**
 *公用添加默认值的方法
 * @param data 对象 or 数组
 * @param defaultvalue 默认值（替换null和undefined）
 * @returns {Uint8Array | BigInt64Array | any[] | Float64Array | Int8Array | Float32Array | Int32Array | Uint32Array | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array|{}|*}
 */
export function generateDefaultValue(data, defaultvalue = '--') {
  if (!isObject(data)) return data;
  const newData = new data.constructor();

  for (let key in Object.getOwnPropertyDescriptors(data)) {
    if (data[key] === null || data[key] === undefined || data[key] === '') {
      newData[key] = defaultvalue;
    } else {
      newData[key] = generateDefaultValue(data[key]);
    }
  }
  return newData;
}

/**
 * 深拷贝
 * @param data
 */
export function deepCopy(data) {
  if (!isObject(data)) return data;
  const newData = new data.constructor();

  for (let key in Object.getOwnPropertyDescriptors(data)) {
    newData[key] = deepCopy(data[key]);
  }
  return newData;
}

/**
 * 深度比较两个数是否相等
 * @param a
 * @param b
 * @returns {boolean}
 */
export function deepCompare(a, b) {
  if (!isObject(a) || !isObject(b)) {
    return a === b;
  }

  const propsA = Object.getOwnPropertyDescriptors(a);
  const propsB = Object.getOwnPropertyDescriptors(b);
  if (Object.keys(propsA).length !== Object.keys(propsB).length) {
    return false;
  }

  return Object.keys(propsA).every(key => deepCompare(a[key], b[key]));
}
