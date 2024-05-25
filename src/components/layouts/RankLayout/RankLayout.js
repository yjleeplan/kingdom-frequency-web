import { Spin } from "antd";
import React from "react";
import Content from "./Content";

const RankLayout = ({ children, isLoading }) => {
  return (
    <Spin spinning={isLoading} tip="잠시만 기다려주세요..">
        <div id="rank-layout">
          {/* <div id="rank-layout-image"></div> */}
          <Content>
            {React.cloneElement(children)}
          </Content>
        </div>
    </Spin>
  );
};

export default RankLayout;
