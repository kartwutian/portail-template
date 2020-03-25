import { action, extendObservable } from 'mobx';
import { useStaticRendering } from 'mobx-react';
import { isServer } from '../utils/helper';
const { routes } = require('../config/config');
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer());

export default class {
  constructor() {
    this.reset(true);
  }

  @action
  reset = init => {
    const state = {
      loading: {
        update: false,
      }, // 存储当前模块所有异步操作的loading状态，约定key值为方法名
      demo: 1111,
      menus: [
        {
          id: 1,
          name: '首页',
          path: routes['index'],
        },
        {
          id: 7,
          name: '新手入门',
          path: routes['get_start'],
        },
        {
          id: 2,
          name: 'API',
          path: routes['api'],
        },
        {
          id: 3,
          name: '关于',
          path: routes['about'],
        },
        {
          id: 4,
          name: '注册',
          path: routes['register'],
        },
        {
          id: 5,
          name: '登录',
          path: routes['login'],
        },
      ],
    };

    if (init) {
      extendObservable(this, state);
    } else {
      Object.keys(state).forEach(key => (this[key] = state[key]));
    }
  };

  // 同步变更状态
  @action
  commit = payload => {
    Object.keys(payload).forEach(key => (this[key] = payload[key]));
  };

  @action
  changeDemo = () => {
    this.demo = this.demo + 1;
  };
}
