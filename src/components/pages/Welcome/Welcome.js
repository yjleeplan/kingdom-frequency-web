import { Col, Row, Button, Typography } from "antd";
import React, { useState } from "react";

const { Text } = Typography;

const Welcome = ({ history, setIsLoading }) => {
  // Touch 버튼 클릭
  const handleButtonClick = () => {
    console.log('touch button click ...');
  };

  return (
    <>
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
      <Row className="project-title1">
        <Col span={24}>
          <Text className='colorC41C7F'>K</Text>INGDOM
        </Col>
      </Row>
      <Row className="project-title2">
        <Col span={24}>
          <Text className='colorC41C7F'>F</Text>REQUEN<Text className='colorC41C7F'>C</Text>Y
        </Col>
      </Row>
      <Row className="touch-button-wrap">
        <Col span={24}>
          <Button
            ghost
            shape="round"
            // type="dashed"
            className="touch-button"
            onClick={handleButtonClick}
          >
            TOUCH
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Welcome;
