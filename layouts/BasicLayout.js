import React, { Fragment, PureComponent } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';

const { Header, Content, Footer } = Layout;

class Page extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  renderLogo = () => {
    return (
      <div className="logo">
        <img src={'logoUrl'} alt="logo" />
        <div>{'appName'}</div>
      </div>
    );
  };

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
      <Header className="header">
        <Row>
          <Col span={6}>{this.renderLogo()}</Col>
          <Col span={12}>{this.renderMenus()}</Col>
        </Row>
      </Header>
    );
  };

  renderFooter() {
    return (
      <Footer className="footer">
        <div className="slogan" data-testid="slogan">
          <span>十万阿里人都在用的笔记与文档知识库</span>
        </div>
        <div className="links" data-testid="links">
          <a
            href="https://www.yuque.com/yuque/help/about"
            target="_blank"
            className=""
          >
            关于语雀
          </a>
          <a href="/help" target="_blank" className="">
            使用帮助
          </a>
          <a
            href="https://www.yuque.com/about/security"
            target="_blank"
            className=""
          >
            数据安全
          </a>
          <a href="/terms" target="_blank" className="">
            服务协议
          </a>
          <span className="split"></span>
          <a href="?language=en-us" target="_self" className="">
            English
          </a>
          <a href="/register" target="_blank" className="link-primary">
            快速注册
          </a>
        </div>
        <div className="copyright" data-testid="copyright">
          <span>© 语雀&nbsp;&nbsp;经营许可证编号：合字B2-20190051</span>
          <span>
            ICP备案号：
            <a href="http://www.beian.miit.gov.cn" target="_blank">
              浙ICP备16025414号-3
            </a>
          </span>
        </div>
      </Footer>
    );
  }

  render() {
    const { children } = this.props;
    return (
      <Layout className="layout">
        <Head>
          <title>沐雨橙风</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        {this.renderHeader()}
        <div>124</div>
        <Content className="content">
          <div style={{ paddingTop: 24, minHeight: 580 }}>{children}</div>
        </Content>
        {this.renderFooter()}
      </Layout>
    );
  }
}

export default withRouter(Page);
