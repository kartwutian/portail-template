import { extendObservable, action } from 'mobx';
import {  } from './_service.pages.js';

export default class Login {
  constructor() {
    this.reset(true);
  }

  @action
  reset = init => {
    const state = {
      loading: false, // 是否显示加载状态
      submiting: false
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
