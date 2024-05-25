import { Spin, Image } from "antd";
import React from "react";
import Content from "./Content";
import cloud01 from "../../../assets/images/cloud_01.png";
import cloud02 from "../../../assets/images/cloud_02.png";
import cloud03 from "../../../assets/images/cloud_03.png";

const ChildhoodLayout = ({ children, isLoading }) => {
  return (
    <Spin spinning={isLoading} tip="잠시만 기다려주세요..">
        <div id="childhood-layout">
          <div id="childhood-layout-image"></div>
          <Content>
            {React.cloneElement(children)}
          </Content>
          {/* <div className="childhood-cloud cloud-1">
            <Image width={300} height={152} src={cloud01} preview={false} />
          </div>
          <div className="childhood-cloud cloud-2">
            <Image width={300} height={173} src={cloud03} preview={false} />
          </div>
          <div className="childhood-cloud cloud-3">
            <Image width={300} height={160} src={cloud02} preview={false} />
          </div>
          <div className="childhood-cloud cloud-4">
            <Image width={150} height={87} src={cloud02} preview={false} />
          </div>
          <div className="childhood-cloud cloud-5">
            <Image width={150} height={76} src={cloud01} preview={false} />
          </div>
          <div className="childhood-cloud cloud-6">
            <Image width={150} height={80} src={cloud03} preview={false} />
          </div>
          <div className="childhood-cloud cloud-7">
            <Image width={150} height={76} src={cloud02} preview={false} />
          </div>
          <div className="childhood-cloud cloud-8">
            <Image width={300} height={152} src={cloud03} preview={false} />
          </div> */}
        </div>
    </Spin>
  );
};

export default ChildhoodLayout;
