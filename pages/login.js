import React from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd';
import Home from '../components/Home';
import './login.less';
import { delay } from '../utils/helper';

@inject('modelLogin')
@observer
class LoginPage extends React.Component {
  constructor(props) {
    super();
    this.store = props.modelLogin;
  }

  static getInitialProps = async ctx => {
    // console.log(ctx);
    ctx.currentModelName = 'modelLogin';
    await delay(1);
    return { demo: 222 };
  };

  render() {
    const {} = this.store;
    return (
      <div className="page-login">
        <Home />>
      </div>
    );
  }
}

export default LoginPage;
