import { Card, Col, Descriptions, Row, Table } from 'antd';
import DescriptionsItem from 'antd/lib/descriptions/Item';
import React from 'react'
import'./index.css'

export default function index() {

  const dataSource = [
    {
      mean: 1,
      median: 12,
      mode: 21,
      standard_deviation: 23,
      scope: 43
    },
    {
      mean: 3,
      median: 2,
      mode: 43,
      standard_deviation: 29,
      scope: 10
    },
  ];
  //均值、中位数、众数、标准差、范围 mean/median/mode/standard deviation/scope

  const columns = [
    {
      title: 'mean',
      dataIndex: 'mean',
      key: 'mean',
    },
    {
      title: 'median',
      dataIndex: 'median',
      key: 'median',
    },
    {
      title: 'mode',
      dataIndex: 'mode',
      key: 'mode',
    },
    {
      title: 'standard deviation',
      dataIndex: 'standard_deviation',
      key: 'standard deviation',
    },
    {
      title: 'scope',
      dataIndex: 'scope',
      key: 'scope',
    },
  ];
  return (
    <div className='DataStatic-centext'>
      <Row>
        <Col span={17} offset={1} className='DataStatic-text'>
          <Card>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
          </Card>
          <Descriptions title="Based on importance to the model with Random Forest Feature Importances Technique." column={3}>
            <Descriptions.Item label="Feature A"> <b>85</b> </Descriptions.Item>
            <Descriptions.Item label="Feature B"> <b>60</b> </Descriptions.Item>
            <Descriptions.Item label="Feature C"> <b>40</b> </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={3} offset={1} className='DataStatic-leftcol'>
          <div className='DataStatic-titleBox'>
            <h2 className='DataStatic-title'>Data</h2>
            <h2 className='DataStatic-title'>Statistics</h2>
          </div>
        </Col>
      </Row>
    </div>
  )
}
