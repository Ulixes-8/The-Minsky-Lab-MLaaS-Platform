// import { Card, Col, Descriptions, Row, Table } from 'antd';
// import DescriptionsItem from 'antd/lib/descriptions/Item';
// import React from 'react'
// import'./index.css'

// export default function index() {

//   const dataSource = [
//     {
//       mean: 1,
//       median: 12,
//       mode: 21,
//       standard_deviation: 23,
//       scope: 43
//     },
//     {
//       mean: 3,
//       median: 2,
//       mode: 43,
//       standard_deviation: 29,
//       scope: 10
//     },
//   ];
//   //均值、中位数、众数、标准差、范围 mean/median/mode/standard deviation/scope

//   const columns = [
//     {
//       title: 'mean',
//       dataIndex: 'mean',
//       key: 'mean',
//     },
//     {
//       title: 'median',
//       dataIndex: 'median',
//       key: 'median',
//     },
//     {
//       title: 'mode',
//       dataIndex: 'mode',
//       key: 'mode',
//     },
//     {
//       title: 'standard deviation',
//       dataIndex: 'standard_deviation',
//       key: 'standard deviation',
//     },
//     {
//       title: 'scope',
//       dataIndex: 'scope',
//       key: 'scope',
//     },
//   ];
//   return (
//     <div className='DataStatic-centext'>
//       <Row>
//         <Col span={17} offset={1} className='DataStatic-text'>
//           <Card>
//             <Table dataSource={dataSource} columns={columns} pagination={false} />
//           </Card>
//           <Descriptions title="Based on importance to the model with Random Forest Feature Importances Technique." column={3}>
//             <Descriptions.Item label="Feature A"> <b>85</b> </Descriptions.Item>
//             <Descriptions.Item label="Feature B"> <b>60</b> </Descriptions.Item>
//             <Descriptions.Item label="Feature C"> <b>40</b> </Descriptions.Item>
//           </Descriptions>
//         </Col>
//         <Col span={3} offset={1} className='DataStatic-leftcol'>
//           <div className='DataStatic-titleBox'>
//             <h2 className='DataStatic-title'>Data</h2>
//             <h2 className='DataStatic-title'>Statistics</h2>
//           </div>
//         </Col>
//       </Row>
//     </div>
//   )
// }
import React, { useState, useEffect } from 'react';
import './index.css';

interface ResponseData {
  dataset_info: string;
  is_classification: string;
  preview_data: string;
  check_missing_values: string;
  check_infinite_values: string;
  check_duplicates: string;
  drop_rows: string;
  remove_missing_values: string;
  remove_infinite_values: string;
  remove_duplicates: string;
  classes: string;
  encode_categorical_variables: string;
  normalize_data: string;
  top_features: string;
}

const DatasetCleanedInfo: React.FC = () => {
  const [data, setData] = useState<ResponseData | null>(null);

  useEffect(() => {
    fetch('https://team12-22.bham.team/api/preprocess')
      .then((response) => response.json())
      .then((responseData: ResponseData) => {
        setData(responseData);
      });
  }, []);

  return (
    <div className="dataset-stats">
      {data ? (
        <div>
          <h2>Preprocessed Dataset Information</h2>
          <p><strong>Cleaned Dataset Info:</strong> {data.dataset_info}</p>
          <p><strong>Remove Missing Values:</strong> {data.remove_missing_values}</p>
          <p><strong>Remove Infinite Values:</strong> {data.remove_infinite_values}</p>
          <p><strong>Remove Duplicates:</strong> {data.remove_duplicates}</p>
          <p><strong>Classes:</strong> {data.classes}</p>
          <p><strong>Encode Categorical Variables:</strong> {data.encode_categorical_variables}</p>
          <p><strong>Normalize Data:</strong> {data.normalize_data}</p>
        </div>
      ) : (
        <p>Preprocessing dataset...</p>
      )}
    </div>
  );
};

export default DatasetCleanedInfo;
