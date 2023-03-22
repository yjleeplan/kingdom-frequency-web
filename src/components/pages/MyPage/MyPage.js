import { Col, Row, Image, Steps, Tabs } from "antd";
import _ from "lodash";
import moment from "moment";
import React, { useState, useEffect } from "react";
import * as api from "../../../api";
import Sticker00 from "../../../assets/images/Sticker_00.png";
import Sticker01 from "../../../assets/images/Sticker_01.png";
import Sticker02 from "../../../assets/images/Sticker_02.png";
import Sticker03 from "../../../assets/images/Sticker_03.png";
import Sticker04 from "../../../assets/images/Sticker_04.png";

const MyPage = ({ setIsLoading, userData }) => {
  // Tab Items
  const tabItems = [
    {
      label: "전체",
      children: "",
      key: "ALL"
    },
    {
      label: "다음 세대",
      children: "",
      key: "MZ_GENERATION"
    },
    {
      label: "영성",
      children: "",
      key: "SPIRIT"
    },
    {
      label: "3040세대",
      children: "",
      key: "YOUNG_ADULT"
    },
    {
      label: "기후",
      children: "",
      key: "CLIMATE"
    }
  ];

  let timer;

  /** State */
  const [resultList, setResultList] = useState(tabItems);
  const [activeKey, setActiveKey] = useState("ALL");

  useEffect(() => {
    if ( !_.isEmpty(userData) ) {
      handleGetUserMissionHistory();
    }
    else {
      //window.location.href = "/main";
    }
    // eslint-disable-next-line
  }, [userData]);

  // 사용자 실천 이력 조회
  const handleGetUserMissionHistory = async () => {
    try {
      timer = setTimeout(() => {
        setIsLoading(true);
      }, 800);

      const { data } = await api.selectMissionHistory({
        path: {
          user_id: userData.id,
        }
      });

      setResultList(data);
    } catch (error) {
      throw new Error(
        error.response
          ? `${error.response.data.code}, ${error.response.data.message}`
          : "사용자 실천 이력 조회 실패"
      );
    } finally {
      clearTimeout(timer);
      setIsLoading(false);
    }
  };

  // 탭 내용 생성
  const generateItems = () => {
    let items = [];
    let data = [];
    let children = "";

    if ( activeKey === "ALL" ) {
      data = [...resultList];
      data.push({
        created_at : userData.created_at,
        desc : "환영합니다~!",
        mission_code : "ALL",
        type : "동참하기"
      });
    }
    else {
      data = _.filter(resultList, { 'mission_code': activeKey });
    }

    _.map(data, (item, index) => {
      const src = {
        ALL : Sticker00,
        MZ_GENERATION : Sticker01,
        SPIRIT : Sticker02,
        YOUNG_ADULT : Sticker03,
        CLIMATE : Sticker04
      }[item.mission_code] || '';

      items.push({
        title: <Row>
                 <Col span={12} className="hist-title" style={{color:"#000"}}>{item["type"]}</Col>
                 <Col span={12} className="hist-date">{moment(item["created_at"]).format("YYYY-MM-DD")}</Col>
                </Row>,
        description: item["desc"],
        icon: <Image
                width={"100%"}
                height={"100%"}
                src={src}
                preview={false}
                />
      });
    });

    if ( !_.isEmpty(data) ) {
      children = <Steps direction="vertical" current={0} items={items}/>;
    }
    else {
      children = <Row className="hist-no-data"><Col span={24}>실천 이력이 없습니다.</Col></Row>
    }

    tabItems[_.findIndex(tabItems, { 'key' : activeKey })].children = children;

    return tabItems;
  };

  // 탭 선택
  const handleChange = (key) => {
    setActiveKey(key);
  };

  return (
    <>
      <Row className="user-info">
        <Col span={24}>
          이형재님의 히스토리
        </Col>
      </Row>
      <Tabs
        type="card"
        onChange={handleChange}
        activeKey={activeKey}
        items={generateItems()}
      />
    </>
  );
};

export default MyPage;
