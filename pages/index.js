import React from 'react';
import { observer, inject } from 'mobx-react';
import { delay } from '../utils/helper';
import { Button } from 'antd';
import BasicLayout from '../layouts/BasicLayout';
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
    const { demo, changeDemo, menus } = this.store;
    return (
      <BasicLayout menus={menus}>
        <div>{demo}</div>
        <Button onClick={changeDemo}>
          <div className="page">styles</div>
        </Button>
      </BasicLayout>
    );
  }
}
