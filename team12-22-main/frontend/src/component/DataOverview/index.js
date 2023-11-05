import { Card, Col, Descriptions, Row, Table } from 'antd'
import React from 'react'
import './index.css'
export default function index() {
  const dataSource = [
    {
      Flow_ID: '10.152.152.11-216.58.220.99-57158-443-6',
      Lable_A: 'Streaming',
      Lable_B: 'Streaming',
      Lable_C: 'Streaming',
    },
    {
      Flow_ID: '10.152.152.11-216.58.220.99-57158-443-6',
      Lable_A: 'Streaming',
      Lable_B: 'Streaming',
      Lable_C: 'Streaming',
    },
    {
      Flow_ID: '10.152.152.11-216.58.220.99-57158-443-6',
      Lable_A: 'Streaming',
      Lable_B: 'Streaming',
      Lable_C: 'Streaming',
    },
    {
      Flow_ID: '10.152.152.11-74.125.136.120-49134-443-6',
      Lable_A: 'Streaming',
      Lable_B: 'Streaming',
      Lable_C: 'Streaming',
    },
    {
      Flow_ID: '10.152.152.11-173.194.65.127-34697-19305-6',
      Lable_A: 'Streaming',
      Lable_B: 'Streaming',
      Lable_C: 'Streaming',
    },
  ];
  //编号，数据类型 Flow_ID,Lable Type
  const columns = [
    {
      title: 'ID',
      render: (text: any, record: any, index: number) => `${index + 1}`
    },
    {
      title: 'Flow ID',
      dataIndex: 'Flow_ID',
      key: 'Flow_ID',
    },
    {
      title: 'Lable A',
      dataIndex: 'Lable_A',
      key: 'Lable_A',
    },
    {
      title: 'Lable B',
      dataIndex: 'Lable_B',
      key: 'Lable_B',
    },
    {
      title: 'Lable C',
      dataIndex: 'Lable_C',
      key: 'Lable_C',
    },
  ];
  return (
    <>
      <Row>
        <Col span={3} offset={1} className='DataOverview-leftCol'>
          <div className='DataOverview-titleBox'>
            <h2 className='DataOverview-title'>Data</h2>
            <h2 className='DataOverview-title'>Overview</h2>
          </div>
        </Col>
        <Col span={18} offset={1}  className='DataOverview-text'>
          <Descriptions column={1} style={{ marginTop: '15px' }}>
            <Descriptions.Item><h3>Your dataset has 141530 rows and 85 columns.</h3></Descriptions.Item>
            <Descriptions.Item><h3>Rows containing missing, null, infinite, or duplicate values will be dropped.</h3></Descriptions.Item>
          </Descriptions>
          <Card>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
          </Card>
          <Descriptions title="Details" column={1}>
            <Descriptions.Item label="Missing values">There are 47 missing values in the dataset.</Descriptions.Item>
            <Descriptions.Item label="Duplicates">There are 24457 missing values in the dataset.</Descriptions.Item>
            <Descriptions.Item label="Infinite values">There are 51 infinite values in the dataset.</Descriptions.Item>
            <Descriptions.Item label="Null values">There are 47 null values in the dataset.</Descriptions.Item>
            <Descriptions.Item label="Categorical columns">There are 6 categorical columns in the dataset.</Descriptions.Item>
            <Descriptions.Item label="Numerical columns">There are 79 numerical columns in the dataset.</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </>
  )
}
