import { Typography, Row, Col } from "antd";
import { LeftOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from "react-router-dom";

const { Text } = Typography;

const Header = ({children}) => {
  const handleClick = () => {
    window.location.href = "/main";
  };

  return (
    <div id='header'>
      <Row className="header-content">
        <Col span={2} className="header-left" onClick={handleClick}>
          <LeftOutlined style={{ fontSize: '22px' }}/>
        </Col>
        <Col span={18} className="header-center">
          <Text className='color-0'>K</Text>INGDOM <Text className='color-0'>F</Text>REQUEN<Text className='color-0'>C</Text>Y
        </Col>
        <Col span={2}>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
