import App from 'next/app';
import React from 'react';
import store from '../store/index';
// import { isServer } from '../utils/helper';
// import { deepCopy } from '../utils/helper';
import { Provider } from 'mobx-react';

class MyMobxApp extends App {
  state = {
    store,
  };

  // fetch Init state
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);
    const currentModelName = appContext.ctx.currentModelName;
    const { pageProps } = appProps;
    console.log(`-- 初始模块为 ${currentModelName} --`);
    let initialStoreState = currentModelName
      ? {
          [currentModelName]: pageProps,
        }
      : {};

    return {
      ...appProps,
      initialStoreState,
    };
  }

  // Hydrate serialized state to store
  static getDerivedStateFromProps(props, state) {
    Object.keys(props.initialStoreState).forEach(item => {
      state.store[item] &&
        state.store[item].commit(props.initialStoreState[item]);
    });

    return state;
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider {...store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}
export default MyMobxApp;
