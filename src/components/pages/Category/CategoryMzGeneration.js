import { Col, Row, Typography, Card, Image, Button, Radio  } from "antd";
import _ from "lodash";
import React, { useState } from "react";
import logoCategory01 from "../../../assets/images/logo_category_01.png";
import board0101 from "../../../assets/images/board/board_01_01.png";

const { Text } = Typography;

const tmpData = [
  { missionId : "m001", missionDesc : "일일교사의 날 (5월, 7월, 8월)" },
  { missionId : "m002", missionDesc : "여름사역 후원과 섬김의 날 (7월, 8월)" },
  { missionId : "m003", missionDesc : "일주일에 하루 '주일학교 기도의 날' 정해서 기도하기" },
  { missionId : "m004", missionDesc : "주일학교 아이들을 보면 먼저 웃으며 인사하기" },
  { missionId : "m005", missionDesc : "수고하는 주일학교 교사들에게 커피 한 잔 대접하기" },
  { missionId : "m006", missionDesc : "주일학교 아이들에게 엘리베이터 양보하기" },
  { missionId : "m007", missionDesc : "주일학교 한 부서의 한 반에 간식 쏘기" },
  { missionId : "m008", missionDesc : "주일학교 예배시간 전/후에 예배실에 찾아가 자리에 앉아서 그 부서를 위해 기도하기" },
  { missionId : "m009", missionDesc : "주일학교 교역자/교사들의 이름을 부르며 시간을 정해서 기도하기" },
  { missionId : "m010", missionDesc : "주일학교 부서의 기도교사로 장/중/단기간 헌신하기" },
  { missionId : "m011", missionDesc : "선병문 장학회, LCS, 문화의집 계좌에 장학헌금 하기" }
];

const CategoryMzGeneration = ({ history, setIsLoading }) => {
  return (
    <>
      <Row className="category-info">
        <Col span={24}>
          <p className="category-info-title">다음 세대</p>
          <p className="category-info-subtitle">MZ Generation</p>
          <p className="category-info-content mt-20">우리는 한 사람, 한 사람이 하나님 나라임을 믿습니다.</p>
          <p className="category-info-content">하나님께서 우리를 통해 하나님 나라의 새 일을 이루실 것입니다.</p>
          <p className="category-info-content">하나님 나라의 새 일을 기대하며 함께 결단하며 나아갑니다.</p>
        </Col>
      </Row>
      <Row className="category-logo">
        <Col span={24}>
          <Image
            width={"90%"}
            height={"100%"}
            src={logoCategory01}
            preview={false}
          />
        </Col>
      </Row>
      <Row className="category-list">
        <Col span={24}>
          <Card bordered={false}>
            <Row>
              <Col span={24}>
                <p className="category-list-title">다음 세대 <Text className='color-1'>실천 항목</Text></p>
                <p className="category-list-subtitle"><Text className="underline">매주 각 영역마다</Text> 새롭게 도전함으로 진행됩니다.</p>
                <p className="category-list-content">1. 한 주에 한 번 아래에 있는 실천항목을 실천합니다.</p>
                <p className="category-list-content">2. 실천한 항목을 선택 후 '실천 완료하기' 버튼을 누릅니다.</p>
                <p className="category-list-content">3. 완료 후 하단의 스티커판을 확인합니다.</p>
              </Col>
            </Row>
            <Row className="category-list-data bl-1">
              <Col span={24}>
                {_.map(tmpData, (item, index) => {
                  const last = (index + 1) < tmpData.length ? "" : "last";
                  const even = (index + 1) % 2 !== 0 ? "" : "even";

                  return (
                    <Row key={index} className={`category-list-data-row ${even} ${last}`}>
                      <Col span={1}  className="category-list-data-col-1">·</Col>
                      <Col span={21} className="category-list-data-col-2">{item['missionDesc']}</Col>
                      <Col span={2}  className="category-list-data-col-3"><Radio></Radio></Col>
                    </Row>
                  );
                })}
              </Col>
            </Row>
            <Row className="category-list-bottom">
              <Col span={24}>
                <Button ghost size="large" className="category-list-button bgc-1">실천 완료하기</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row className="category-stamp">
        <Col span={24}>
          <Image
            width={"100%"}
            height={"100%"}
            src={board0101}
            preview={false}
          />
          <p className="category-stamp-title">다음 세대 <Text className='color-1'>스티커판</Text></p>
          <p className="category-stamp-content">스티커를 모두 모으시면 뱃지가 지급됩니다.</p>
          <Row className="category-stamp-bottom">
            <Col span={24}>
              <Row className="category-stamp-count bgc-1">
                <Col span={15}>현재 나의 스티커 갯수</Col>
                <Col span={2} className="category-stamp-count-bar"></Col>
                <Col span={7}>1개</Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default CategoryMzGeneration;
