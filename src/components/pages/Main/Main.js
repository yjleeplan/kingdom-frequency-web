import { Col, Row, Typography, Card } from "antd";
import React, { useState } from "react";
import SearchAttendanceModal from "../../common/modal/SearchAttendanceModal/SearchAttendanceModal";
import UserAddModal from "../../common/modal/UserAddModal/UserAddModal";

const { Text } = Typography;

const Main = ({ history, setIsLoading }) => {
  /** State */
  const [userAddModalVisible, setUserAddModalVisible] = useState(false);
  const [searchAttendanceModalVisible, setSearchAttendanceModalVisible] = useState(false);

  // 사용자 등록 모달 오픈
  const handleUserAddModalOpen = () => {
    setUserAddModalVisible(true);
  };

  // 사용자 등록 모달 닫기
  const handleUserAddModalClose = () => {
    setUserAddModalVisible(false);
  };

  // 출석체크 모달 오픈
  const handleSearchAttendanceModalOpen = () => {
    setSearchAttendanceModalVisible(true);
  };

  // 출석체크 모달 닫기
  const handleSearchAttendanceModalClose = () => {
    setSearchAttendanceModalVisible(false);
  };

  return (
    <>
      <Row className="main-title">
        <Col span={24}>
          <Text className='colorC41C7F'>K</Text>INGDOM
          <br/>
          <Text className='colorC41C7F'>F</Text>REQUEN<Text className='colorC41C7F'>C</Text>Y
        </Col>
      </Row>
      <Row className="main-login-box">
        <Col span={24}>
          <Row>
            <Col span={24}>
              현재 <Text className='colorC41C7F'>1,200</Text>명 참여중!
            </Col>
          </Row>
          <Row>
            <Col span={14}>
              
            </Col>
            <Col span={10}>
              
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="main-info">
        <Col span={24}>
          <Row className="main-info-title">
            <Col span={24}>
              Kingdom Frequency란?
            </Col>
          </Row>
          <Row className="main-info-content">
            <Col span={24}>
              하나님 나라를 위한 작은 행동들이 계속해서 진동한다는 의미입니다.<br/>
              우리의 삶은 하나님 나라가 계속해서 선택되고 드러날 수 있도록<br/>
              계속해서 도전하는 것입니다.
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="main-category">
        <Col span={24}>
          <Row>
            <Col span={12} className="main-category-mz">
              <Card>
                <p>다음 세대</p>
              </Card>
            </Col>
            <Col span={12} className="main-category-spirit">
              <Card>
                <p>영성</p>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="main-category-3040">
              <Card>
                <p>3040세대</p>
              </Card>
            </Col>
            <Col span={12} className="main-category-climate">
              <Card>
                <p>기후</p>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Main;
