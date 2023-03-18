import { Spin } from "antd";
import React from "react";
import Content from "./Content";

const CategoryLayout = ({ children, isLoading, type = "" }) => {
  return (
    <div id="category-layout" className={type}>
      <Spin spinning={isLoading} tip="잠시만 기다려주세요..">
        <Content>
          {React.cloneElement(children)}
        </Content>
      </Spin>
    </div>
  );
};

export default CategoryLayout;
