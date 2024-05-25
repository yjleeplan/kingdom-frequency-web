import { Spin } from "antd";
import React from "react";
import Header from "./Header";
import Content from "./Content";

const RankDetailLayout = ({ children, isLoading, type, title }) => {
  return (
    <Spin spinning={isLoading} tip="잠시만 기다려주세요..">
        <div id="rank-detail-layout" className={`type-${type}`}>
          <Header title={title} />
          <Content>
            {React.cloneElement(children)}
          </Content>
        </div>
    </Spin>
  );
};

export default RankDetailLayout;
