import { Spin } from "antd";
import React from "react";
import Content from "./Content";

const MyPageLayout = ({ children, isLoading }) => {
  return (
    <Spin spinning={isLoading} tip="잠시만 기다려주세요..">
      <div id="mypage-layout">
        <Content>
          {React.cloneElement(children)}
        </Content>
      </div>
    </Spin>
  );
};

export default MyPageLayout;
