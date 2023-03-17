import { Col, Row, Typography, Card, Image, Button } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserSelectModal from "../../common/modal/UserSelectModal/UserSelectModal";
import UserAddModal from "../../common/modal/UserAddModal/UserAddModal";
import iconFightingHand from "../../../assets/images/icon_fighting_hand.png";

const { Text } = Typography;

const Main = ({ history, setIsLoading, userData, setUserData }) => {
  /** State */
  const [userAddModalVisible, setUserAddModalVisible] = useState(false);
  const [userSelectModalVisible, setUserSelectModalVisible] = useState(false);

  // 사용자 등록 모달 오픈
  const handleUserAddModalOpen = () => {
    setUserAddModalVisible(true);
  };

  // 사용자 등록 모달 닫기
  const handleUserAddModalClose = () => {
    setUserAddModalVisible(false);
  };

  // 사용자 선택 모달 오픈
  const handleUserSelectModalOpen = () => {
    setUserSelectModalVisible(true);
  };

  // 사용자 선택 모달 닫기
  const handleUserSelectModalClose = () => {
    setUserSelectModalVisible(false);
  };

  return (
    <>
      <Row className="main-title">
        <Col span={24}>
          <Text className='color-0'>K</Text>INGDOM<br/>
          <Text className='color-0'>F</Text>REQUEN<Text className='color-0'>C</Text>Y
        </Col>
      </Row>
      <Row className="main-user-box">
        <Col span={24}>
          <Row>
            <Col span={14}>
              <Row>
                <Col span={24} className="main-user-box-text-01">
                  현재 <Text className='color-0'>1,200</Text>명 참여중!
                </Col>
              </Row>
              <Row>
                <Col span={24} className="main-user-box-text-02">
                  하나님 나라를 위한<br/>
                  성도님의 행동들이<br/>
                  계속해서 진동하길 원합니다.
                </Col>
              </Row>
            </Col>
            <Col span={10}>
              <Image
                width={"100%"}
                height={"100%"}
                src={iconFightingHand}
                preview={false}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Button
                ghost
                shape="round"
                className="main-user-btn-01"
                onClick={handleUserAddModalOpen}
              >
                동참하기
              </Button>
              <Button
                ghost
                shape="round"
                className="main-user-btn-02"
                onClick={handleUserSelectModalOpen}
              >
                로그인
              </Button>
            </Col>
          </Row>
          <div id="userAddModal">
            <UserAddModal
              visible={userAddModalVisible}
              onCancel={handleUserAddModalClose}
              setIsLoading={setIsLoading}
            />
          </div>
          <div id="searchAttendanceModal">
            <UserSelectModal
              visible={userSelectModalVisible}
              onCancel={handleUserSelectModalClose}
              setIsLoading={setIsLoading}
              setUserData={setUserData}
            />
          </div>
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
              <Link to="/category/mzGeneration" style={{color: "inherit"}}>
                <Card bordered={false}>
                  <p className="main-category-title">다음 세대</p>
                  <p className="main-category-subtitle">MZ Generation</p>
                </Card>
              </Link>
            </Col>
            <Col span={12} className="main-category-spirit">
              <Link to="/category/spirit" style={{color: "inherit"}}>
                <Card bordered={false}>
                  <p className="main-category-title">영성</p>
                  <p className="main-category-subtitle">Spirit</p>
                </Card>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="main-category-3040">
              <Link to="/category/youngAdult" style={{color: "inherit"}}>
                <Card bordered={false}>
                  <p className="main-category-title">3040 세대</p>
                  <p className="main-category-subtitle">Young Adult</p>
                </Card>
              </Link>
            </Col>
            <Col span={12} className="main-category-climate">
              <Link to="/category/climate" style={{color: "inherit"}}>
                <Card bordered={false}>
                  <p className="main-category-title">기후</p>
                  <p className="main-category-subtitle">Climate</p>
                </Card>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Main;
