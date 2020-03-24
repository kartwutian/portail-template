import axios from 'axios'; // 引用axios
import { message } from 'antd';

export const SUCCESS_CODE = '000000';

// eslint-disable-next-line no-unused-vars
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '可能是请求方法出错啦',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

// axios 配置
axios.defaults.timeout = 30000;
// 通过注入的环境变量判断代码执行环境做不同的配置
// eslint-disable-next-line no-undef
if (process.env.API === 'development') {
  // http://rap2api.taobao.org/app/mock/121297/${config.method}
  // axios.defaults.baseURL = '/proxy'; // 这是本地调用路径前缀
} else {
  // axios.defaults.baseURL = '/post'; // 这是线上调用路径前缀
}

axios.defaults.withCredentials = true;

/**
 * @param url
 * @param options
 * @returns {Promise<AxiosResponse<any>>}
 *
 */
export default function request(url, options) {
  return axios(url, {
    ...options,
    headers: options
      ? {
          'x-requested-with': 'XMLHttpRequest',
          'Content-Type': 'application/json',
          ...options.headers
        }
      : {
          'x-requested-with': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        },
    data: options && options.data
  })
    .then(res => {
      if (res.status !== 200) {
        // 处理为2xx但非200的错误请求的message
        const error = new Error(codeMessage[res.status]);
        error.status = res.status;
        error.response = res;
        throw error;
      } else if (res.data && res.data.code !== SUCCESS_CODE) {
        // 处理状态为200的错误提示message
        const error = new Error(
          (res.data && res.data.msg) || '返回数据结构异常'
        );
        error.status = res.status;
        error.response = res;
        throw error;
      } else {
        return Promise.resolve(res.data);
      }
    })
    .catch(async error => {
      console.dir(error);
      if (error.response) {
        // 处理有response的请求错误
        if (error.status >= 200 && error.status < 300) {
          // 处理状态为2xx的错误提示
          // 过滤不弹出错误提醒的接口
          message.error(error.message);
        } else {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          message.error(codeMessage[error.response.status]); // 处理状态为非2xx的错误
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // TODO 失败处理
        message.error(`请求失败，无返回数据(${error.message})`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        message.error('请求失败，未知错误');
      }
      // console.dir && console.dir(error);
      return Promise.reject(error);
    });
}
