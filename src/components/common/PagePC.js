import { Col, Row, Typography } from "antd";
import React from 'react';

const { Text } = Typography;

const PagePC = () => {
  return (
    <>
      <div id="welcome-layout">
        <div id="content">
          <Row className="project-year">
            <Col span={24}>
              2023
            </Col>
          </Row>
          <Row className="project-sub-title">
            <Col span={24}>
              금광교회 결단 프로젝트
            </Col>
          </Row>
          <Row className="project-title">
            <Col span={24}>
              <Text className='color-0'>K</Text>INGDOM
              <br/>
              <Text className='color-0'>F</Text>REQUEN<Text className='color-0'>C</Text>Y
            </Col>
          </Row>
          <Row className="pc-comment">
            <Col span={24}>
              모바일로 접속 해주세요.
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default PagePC;