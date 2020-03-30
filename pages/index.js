import React from 'react';
import { observer, inject } from 'mobx-react';
// import { delay } from '../utils/helper';
import TweenOne from 'rc-tween-one';
import { Button } from 'antd';
import BasicLayout from '../layouts/BasicLayout';
import './index.less';

@inject('modelIndex')
@observer
export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.modelIndex;
    console.log(props);
  }

  static getInitialProps = async ctx => {
    // console.log(ctx);
    ctx.pageModelNames = ['modelIndex']; // 模块名集合
    // await delay(2);
    return {
      modelIndex: { demo: 222 }, // 模块内容
    };
  };

  render() {
    const { demo, changeDemo, menus } = this.store;
    return (
      <BasicLayout menus={menus}>
        <div>{demo}</div>

        <TweenOne>
          <Button onClick={changeDemo}> change</Button>
        </TweenOne>
      </BasicLayout>
    );
  }
}
