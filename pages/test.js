import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Card, Table, Tag, Button, Row, PageHeader } from 'antd';
import './test.less';

@inject('appGlobalModel')
@inject('modelTest')
@observer
class TestPage extends Component {
  constructor(props) {
    super(props);
    this.globalStore = props.appGlobalModel;
    this.store = props.modelTest;
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <span>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        )
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a style={{ marginRight: 16 }}>Invite {record.name}</a>
            <a>Delete</a>
          </span>
        )
      }
    ];
  }

  test = async () => {
    await this.store.update();
    console.log(this.store.data.length);
  };

  render() {
    const {
      store: { data, commit, demo, loading },
      columns
    } = this;

    const routes = [
      {
        path: 'index',
        breadcrumbName: 'First-level Menu'
      },
      {
        path: 'first',
        breadcrumbName: 'Second-level Menu'
      },
      {
        path: 'second',
        breadcrumbName: 'Third-level Menu'
      }
    ];

    return (
      <div className="page-test">
        <PageHeader
          ghost={false}
          title="Title"
          breadcrumb={{ routes }}
          subTitle="This is a subtitle"
        />

        <div className="content-card__wrapper">
          <Card>
            <Row
              style={{
                marginBottom: 16
              }}
            >
              <Button
                type="primary"
                onClick={this.test}
                loading={loading.update}
              >
                请求数据
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  commit({
                    demo: demo + 1234566
                  });
                }}
                loading={loading.update}
              >
                {demo}
              </Button>
            </Row>

            <Table columns={columns} dataSource={data} />
          </Card>
        </div>
      </div>
    );
  }
}

export default TestPage;
