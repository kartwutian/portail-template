import { extendObservable, action } from 'mobx';
import {  } from './_service.pages.js';

export default class Test {
  constructor() {
    this.reset(true);
  }

  @action
  reset = init => {
    const state = {
      loading: {
        update: false
      }, // 存储当前模块所有异步操作的loading状态，约定key值为方法名
      demo: 1111,
      data: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser']
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher']
        }
      ]
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
  update = async () => {
    try {
      console.log('start');
      this.loading.update = true;
      // await delay(1);
      console.log(this);
      this.data = [
        ...this.data,
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher']
        }
      ];
    } catch (error) {
      console.error(error);
    } finally {
      console.log('end');
      this.loading.update = false;
    }
  };
}
