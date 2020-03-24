import { action, observable } from 'mobx';
import { useStaticRendering } from 'mobx-react';

const isServer = typeof window === 'undefined';
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer);

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
