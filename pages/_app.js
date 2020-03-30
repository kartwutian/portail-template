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
    let pageModelNames = appContext.ctx.pageModelNames;

    const { pageProps } = appProps;
    // 兼容单个值
    if (typeof pageModelNames === 'string') {
      pageModelNames = [pageModelNames];
    }
    let initialStoreState = pageModelNames ? pageProps : {};

    // console.log(Object.keys(pageProps));
    const plainPageProps = Object.keys(pageProps).reduce((result, next) => {
      return { ...result, ...pageProps[next] };
    }, {});
    // console.log(plainPageProps);
    return {
      pageProps: plainPageProps,
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
    // console.log(pageProps);
    return (
      <Provider {...store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}
export default MyMobxApp;
