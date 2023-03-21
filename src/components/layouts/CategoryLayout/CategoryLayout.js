import { Spin } from "antd";
import React from "react";
import Content from "./Content";
import Header from "./Header";

const CategoryLayout = ({ children, isLoading, type = "" }) => {
  return (
    <div id="category-layout" className={type}>
      <Spin spinning={isLoading} tip="잠시만 기다려주세요..">
        <Header/>
        <Content>
          {React.cloneElement(children)}
        </Content>
      </Spin>
    </div>
  );
};

export default CategoryLayout;
