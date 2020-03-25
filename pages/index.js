import React from 'react';
import { observer, inject } from 'mobx-react';
import { delay } from '../utils/helper';

@inject('modelIndex')
@observer
export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.modelIndex;
  }

  static getInitialProps = async ctx => {
    // console.log(ctx);
    ctx.currentModelName = 'modelIndex';
    await delay(2);
    return { demo: 222 };
  };

  render() {
    const { demo, changeDemo } = this.store;
    return (
      <div>
        <div>{demo}</div>
        <button onClick={changeDemo}>change</button>
      </div>
    );
  }
}
