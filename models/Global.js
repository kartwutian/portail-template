import { extendObservable, action } from 'mobx';
const { routes } = require('../config/config');
import {} from './_service.pages.js';

export default class Get_start {
  constructor() {
    this.reset(true);
  }

  @action
  reset = init => {
    const state = {
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
      screen: 'large',
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
}
