import React from 'react';
import { Row, Col } from "antd";

const Header = ({children, title}) => {
  return (
    <div id='rank-detail-header'>
      <Row>
        <Col span={24}>
          {title}
        </Col>
      </Row>
    </div>
  );
};

export default Header;
