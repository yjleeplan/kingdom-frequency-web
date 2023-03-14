import { Col, Row, Typography, Card, Image, Button } from "antd";
import React, { useState } from "react";
import SearchAttendanceModal from "../../common/modal/SearchAttendanceModal/SearchAttendanceModal";
import UserAddModal from "../../common/modal/UserAddModal/UserAddModal";
import iconFightingHand from "../../../assets/images/icon_fighting_hand.png";

const { Text } = Typography;

const CategorySpirit = ({ history, setIsLoading }) => {
  return (
    <>
      <Row className="category-info">
        <Col span={24}>
          
        </Col>
      </Row>
      <Row className="category-list">
        <Col span={24}>

        </Col>
      </Row>
      <Row className="category-stamp">
        <Col span={24}>

        </Col>
      </Row>
    </>
  );
};

export default CategorySpirit;
