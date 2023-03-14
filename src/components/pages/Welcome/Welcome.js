import { Col, Row, Typography, Image } from "antd";
import React from "react";
import iconFingerTap from "../../../assets/images/icon_finger_tap.svg";

const { Text } = Typography;

const Welcome = ({ history, setIsLoading }) => {
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
      <Row className="project-title">
        <Col span={24}>
          <Text className='colorC41C7F'>K</Text>INGDOM
          <br/>
          <Text className='colorC41C7F'>F</Text>REQUEN<Text className='colorC41C7F'>C</Text>Y
        </Col>
      </Row>
      <Row className="touch-comment-wrap">
        <Col span={24}>
          <Row className="touch-image">
            <Col span={24}>
              <Image
                width={"20%"}
                height={"100%"}
                src={iconFingerTap}
                preview={false}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              화면을 터치해주세요
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Welcome;
