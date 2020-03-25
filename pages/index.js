import React from 'react';
import { observer, inject } from 'mobx-react';
import { delay } from '../utils/helper';
import { Button } from 'antd';
import './index.less';

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
        <Button onClick={changeDemo}>
          <div className="page">styles</div>
        </Button>
      </div>
    );
  }
}
