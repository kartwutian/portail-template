import React, { Fragment, PureComponent } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';
import './index.less';

const { Header, Content, Footer } = Layout;

class Page extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  renderMenus = () => {
    const {
      menus,
      router: { pathname },
    } = this.props;
    return (
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[pathname]}
        style={{ lineHeight: '63px' }}
      >
        {menus.map(item => (
          <Menu.Item key={item.path}>
            <Link href={item.path}>
              <a>{item.name}</a>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  renderHeader = () => {
    return (
      <Header className="header" theme="">
        <Row>
          <Col span={6}>
            <div className="header__logo">
              <img
                className="header__logo-img"
                src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4016333918,4269266815&fm=26&gp=0.jpg"
                alt="logo"
              />
              <div className="header__logo-name">my home</div>
            </div>
          </Col>
          <Col span={12}>{this.renderMenus()}</Col>
        </Row>
      </Header>
    );
  };

  renderFooter() {
    return <Footer className="footer">footer</Footer>;
  }

  render() {
    const { children } = this.props;
    return (
      <Layout className="base-layout">
        <Head>
          <title>沐雨橙风</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        {this.renderHeader()}
        <Content className="content">
          <div style={{ paddingTop: 24, minHeight: 580 }}>{children}</div>
        </Content>
        {this.renderFooter()}
      </Layout>
    );
  }
}

export default withRouter(Page);
