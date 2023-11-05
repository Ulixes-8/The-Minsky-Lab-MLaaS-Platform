import { Col, Descriptions, Row, Table } from 'antd'
import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts';
import './index.css'
export default function Index() {
  const chartDom: any = useRef()

  useEffect(() => {
    // setIsLoading(true)
    // setTimeout(() => {
    //   setIsLoading(false)
    getChart()
    // }, 1000);
  }, [])

  const getChart = () => {
    if (!chartDom.current) return
    var myChart = echarts.init(chartDom.current);
    var option;
    option = {
      xAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'D', 'E', 'F']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [85, 60, 40, 50, 75, 55],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };
    option && myChart.setOption(option);
  }
  return (
    <div className='FeatureRanking-contextBox'>
      <Row>
        <Col span={4} className='FeatureRanking-leftcol'>
          <div className='FeatureRanking-titleBox'>
            <h2 className='FeatureRanking-title'>Feature</h2>
            <h2 className='FeatureRanking-title'>Ranking</h2>
          </div>
        </Col>
        <Col span={18} className='FeatureRanking-text'>
          <Row className='FeatureRanking-row'>
            <Col span={12}>
              <div ref={chartDom} style={{ width: '100%', height: '300px' }}></div>
            </Col>
            <Col span={12} className='FeatureRanking-rightCol'>
              <Descriptions title={<p>Based on importance to the model with Random Forest Feature Importances Technique.</p>} column={1}>
                <Descriptions.Item label="Feature A"> <b>85</b> </Descriptions.Item>
                <Descriptions.Item label="Feature B"> <b>60</b> </Descriptions.Item>
                <Descriptions.Item label="Feature C"> <b>40</b> </Descriptions.Item>
                <Descriptions.Item label="Feature D"> <b>50</b> </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
