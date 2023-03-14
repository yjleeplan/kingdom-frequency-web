import { Spin } from "antd";
import React, { useState } from "react";
import Content from "./Content";

const CategoryLayout = ({ children, layoutClass = "" }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div id="category-layout" className={layoutClass}>
      <Spin spinning={isLoading} tip="잠시만 기다려주세요..">
        <Content>
          {React.cloneElement(children, { setIsLoading })}
        </Content>
      </Spin>
    </div>
  );
};

export default CategoryLayout;
