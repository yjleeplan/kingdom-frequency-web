import { Spin } from "antd";
import React, { useState } from "react";
import Content from "./Content";
import { Link } from "react-router-dom";

const WelcomeLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Spin spinning={isLoading} tip="잠시만 기다려주세요..">
      <Link to="/main" style={{color: "inherit"}}>
        <div id="welcome-layout">
          <Content>
            {React.cloneElement(children, { setIsLoading })}
          </Content>
        </div>
      </Link>
    </Spin>
  );
};

export default WelcomeLayout;
