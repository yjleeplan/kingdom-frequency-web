import { Spin } from "antd";
import React from "react";
import Content from "./Content";

const RankGameLayout = ({ children, isLoading, type }) => {
  return (
    <Spin spinning={isLoading} tip="잠시만 기다려주세요..">
        <div id="rank-game-layout" className={`type-${type}`}>
          <Content>
            {React.cloneElement(children)}
          </Content>
        </div>
    </Spin>
  );
};

export default RankGameLayout;
