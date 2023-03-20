import { Form, Input, message, Modal, Button, Col, Row, Typography, Card, Image, Steps, Tabs } from "antd";
import _ from "lodash";
import React, { useState } from "react";
import * as api from "../../../api";
import Sticker00 from "../../../assets/images/Sticker_00.png";
import Sticker01 from "../../../assets/images/Sticker_01.png";
import Sticker02 from "../../../assets/images/Sticker_02.png";
import Sticker03 from "../../../assets/images/Sticker_03.png";
import Sticker04 from "../../../assets/images/Sticker_04.png";

const { Text } = Typography;

const MyPage = ({ setIsLoading, userData }) => {
  /** State */
  const [resultList, setResultList] = useState([]);
  
  const initialItems = [
    {
      label: '전체',
      children: <Steps
                    direction="vertical"
                    current={0}
                    items={[
                        {
                            title: <Row><Col span={12} className="hist-title" style={{color:"#000"}}>3040세대</Col><Col span={12} className="hist-date">2023-07-05</Col></Row>,
                            description: "젊은 가정 & 신혼부부 지원 확대 (장소 확보)",
                            icon: <Image
                                    width={"100%"}
                                    height={"100%"}
                                    src={Sticker03}
                                    preview={false}
                                    />
                        },
                        {
                            title: <Row><Col span={12} className="hist-title" style={{color:"#000"}}>다음 세대</Col><Col span={12} className="hist-date">2023-06-10</Col></Row>,
                            description: "일일교사의 날 (5월, 7월, 8월)",
                            icon: <Image
                                    width={"100%"}
                                    height={"100%"}
                                    src={Sticker01}
                                    preview={false}
                                    />
                        },
                        {
                            title: <Row><Col span={12} className="hist-title" style={{color:"#000"}}>다음 세대</Col><Col span={12} className="hist-date">2023-06-09</Col></Row>,
                            description: "주일학교 부서의 기도교사로 장/중/단기간 헌신하기",
                            icon: <Image
                                    width={"100%"}
                                    height={"100%"}
                                    src={Sticker01}
                                    preview={false}
                                    />
                        },
                        {
                            title: <Row><Col span={12} className="hist-title" style={{color:"#000"}}>3040세대</Col><Col span={12} className="hist-date">2023-05-13</Col></Row>,
                            description: "아이들 돌봄 교사 지원",
                            icon: <Image
                                    width={"100%"}
                                    height={"100%"}
                                    src={Sticker03}
                                    preview={false}
                                    />
                        },
                        {
                            title: <Row><Col span={12} className="hist-title" style={{color:"#000"}}>영성</Col><Col span={12} className="hist-date">2023-04-21</Col></Row>,
                            description: "말아톤 프로젝트 매일 빠지지 않고 참여하기",
                            icon: <Image
                                    width={"100%"}
                                    height={"100%"}
                                    src={Sticker02}
                                    preview={false}
                                    />
                        },
                        {
                            title: <Row><Col span={12} className="hist-title" style={{color:"#000"}}>영성</Col><Col span={12} className="hist-date">2023-04-17</Col></Row>,
                            description: "기도 짝꿍 정하기 (시너지 효과)",
                            icon: <Image
                                    width={"100%"}
                                    height={"100%"}
                                    src={Sticker02}
                                    preview={false}
                                    />
                        },
                        {
                            title: <Row><Col span={12} className="hist-title" style={{color:"#000"}}>기후</Col><Col span={12} className="hist-date">2023-04-02</Col></Row>,
                            description: "교회 분리수거함 잘 정리하기",
                            icon: <Image
                                    width={"100%"}
                                    height={"100%"}
                                    src={Sticker04}
                                    preview={false}
                                    />
                        },
                        {
                            title: <Row><Col span={12} className="hist-title" style={{color:"#000"}}>다음 세대</Col><Col span={12} className="hist-date">2023-03-23</Col></Row>,
                            description: "주일학교 부서의 기도교사로 장/중/단기간 헌신하기",
                            icon: <Image
                                    width={"100%"}
                                    height={"100%"}
                                    src={Sticker01}
                                    preview={false}
                                    />
                        },
                        {
                            title: <Row><Col span={12} className="hist-title" style={{color:"#000"}}>가입</Col><Col span={12} className="hist-date">2023-03-20</Col></Row>,
                            description: "환영합니다~!",
                            icon: <Image
                                    width={"100%"}
                                    height={"100%"}
                                    src={Sticker00}
                                    preview={false}
                                    />
                        },
                    ]}
                />,
      key: '1',
    },
    {
      label: '다음 세대',
      children: <Steps
                    direction="vertical"
                    current={0}
                    items={[
                        {
                            title: <Row><Col span={12} className="hist-title" style={{color:"#000"}}>다음 세대</Col><Col span={12} className="hist-date">2023-06-10</Col></Row>,
                            description: "일일교사의 날 (5월, 7월, 8월)",
                            icon: <Image
                                    width={"100%"}
                                    height={"100%"}
                                    src={Sticker01}
                                    preview={false}
                                    />
                        },
                        {
                            title: <Row><Col span={12} className="hist-title" style={{color:"#000"}}>다음 세대</Col><Col span={12} className="hist-date">2023-06-09</Col></Row>,
                            description: "주일학교 부서의 기도교사로 장/중/단기간 헌신하기",
                            icon: <Image
                                    width={"100%"}
                                    height={"100%"}
                                    src={Sticker01}
                                    preview={false}
                                    />
                        },
                        {
                            title: <Row><Col span={12} className="hist-title" style={{color:"#000"}}>다음 세대</Col><Col span={12} className="hist-date">2023-03-23</Col></Row>,
                            description: "주일학교 부서의 기도교사로 장/중/단기간 헌신하기",
                            icon: <Image
                                    width={"100%"}
                                    height={"100%"}
                                    src={Sticker01}
                                    preview={false}
                                    />
                        },
                    ]}
                />,
      key: '2',
    },
    {
      label: '영성',
      children: <Steps
                    direction="vertical"
                    current={0}
                    items={[
                        {
                            title: <Row><Col span={12} className="hist-title" style={{color:"#000"}}>영성</Col><Col span={12} className="hist-date">2023-04-21</Col></Row>,
                            description: "말아톤 프로젝트 매일 빠지지 않고 참여하기",
                            icon: <Image
                                    width={"100%"}
                                    height={"100%"}
                                    src={Sticker02}
                                    preview={false}
                                    />
                        },
                        {
                            title: <Row><Col span={12} className="hist-title" style={{color:"#000"}}>영성</Col><Col span={12} className="hist-date">2023-04-17</Col></Row>,
                            description: "기도 짝꿍 정하기 (시너지 효과)",
                            icon: <Image
                                    width={"100%"}
                                    height={"100%"}
                                    src={Sticker02}
                                    preview={false}
                                    />
                        },
                    ]}
                />,
      key: '3',
    },
    {
      label: '3040세대',
      children: <Steps
                    direction="vertical"
                    current={0}
                    items={[
                        {
                            title: <Row><Col span={12} className="hist-title" style={{color:"#000"}}>3040세대</Col><Col span={12} className="hist-date">2023-07-05</Col></Row>,
                            description: "젊은 가정 & 신혼부부 지원 확대 (장소 확보)",
                            icon: <Image
                                    width={"100%"}
                                    height={"100%"}
                                    src={Sticker03}
                                    preview={false}
                                    />
                        },
                        {
                            title: <Row><Col span={12} className="hist-title" style={{color:"#000"}}>3040세대</Col><Col span={12} className="hist-date">2023-05-13</Col></Row>,
                            description: "아이들 돌봄 교사 지원",
                            icon: <Image
                                    width={"100%"}
                                    height={"100%"}
                                    src={Sticker03}
                                    preview={false}
                                    />
                        },
                    ]}
                />,
      key: '4',
    },
    {
      label: '기후',
      children: <Steps
                    direction="vertical"
                    current={0}
                    items={[
                        {
                            title: <Row><Col span={12} className="hist-title" style={{color:"#000"}}>기후</Col><Col span={12} className="hist-date">2023-04-02</Col></Row>,
                            description: "교회 분리수거함 잘 정리하기",
                            icon: <Image
                                    width={"100%"}
                                    height={"100%"}
                                    src={Sticker04}
                                    preview={false}
                                    />
                        },
                    ]}
                />,
      key: '5',
    },
  ];

  return (
    <>
      <Row className="user-info">
        <Col span={24}>
          이형재님의 히스토리
        </Col>
      </Row>
      <Tabs
        type="card"
        //onChange={onChange}
        //activeKey={activeKey}
        items={initialItems}
      />
    </>
  );
};

export default MyPage;
