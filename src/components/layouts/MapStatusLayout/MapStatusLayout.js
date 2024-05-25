import { Spin } from "antd";
import React from "react";
import Content from "./Content";

const MapStatusLayout = ({ children, isLoading }) => {
  return (
    <div style={{height: '100%', background: '#fafafa'}}>
    <Spin spinning={isLoading} tip="잠시만 기다려주세요..">
      <div id="map-status-layout">
        <Content>
          {React.cloneElement(children)}
        </Content>
      </div>
    </Spin>
    </div>
  );
};

export default MapStatusLayout;
