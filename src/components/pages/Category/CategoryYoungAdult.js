import { Col, Row, Typography, Card, Image, Button, Radio  } from "antd";
import _ from "lodash";
import React, { useState } from "react";
import logoCategory03 from "../../../assets/images/logo_category_03.png";
import board0302 from "../../../assets/images/board/board_03_02.png";

const { Text } = Typography;

const tmpData = [
  { missionId : "m001", missionDesc : "지하 1층 수유실과 휴게용 놀이공간 확보" },
  { missionId : "m002", missionDesc : "젊은 가정 & 신혼부부 지원 확대 (장소 확보)" },
  { missionId : "m003", missionDesc : "유모차/아기띠를 한 아기엄마에게 줄서기/엘리베이터 양보하기" },
  { missionId : "m004", missionDesc : "아이들 돌봄 교사 지원" },
  { missionId : "m005", missionDesc : "영유아부 교사와 부모들 격려와 후원하기" }
];

const CategoryYoungAdult = ({ history, setIsLoading }) => {
  return (
    <>
      <Row className="category-info">
        <Col span={24}>
          <p className="category-info-title">3040 세대</p>
          <p className="category-info-subtitle">Young Adult</p>
          <p className="category-info-content mt-20">새로운 가정이 탄생하는 것과,</p>
          <p className="category-info-content">하나님이 주신 태의 열매를 통해</p>
          <p className="category-info-content">이 땅에 하나님의 나라가 확장됨을 믿습니다.</p>
          <p className="category-info-content mt-20">믿음의 세대 전수를 통해</p>
          <p className="category-info-content">새 일을 행하실 하나님을 바라보며 믿음으로 결단합니다.</p>
        </Col>
      </Row>
      <Row className="category-logo">
        <Col span={24}>
          <Image
            width={"90%"}
            height={"100%"}
            src={logoCategory03}
            preview={false}
          />
        </Col>
      </Row>
      <Row className="category-list">
        <Col span={24}>
          <Card bordered={false}>
            <Row>
              <Col span={24}>
                <p className="category-list-title">3040세대 <Text className='color-3'>실천 항목</Text></p>
                <p className="category-list-subtitle"><Text className="underline">매주 각 영역마다</Text> 새롭게 도전함으로 진행됩니다.</p>
                <p className="category-list-content">1. 한 주에 한 번 아래에 있는 실천항목을 실천합니다.</p>
                <p className="category-list-content">2. 실천한 항목을 선택 후 '실천 완료하기' 버튼을 누릅니다.</p>
                <p className="category-list-content">3. 완료 후 하단의 스티커판을 확인합니다.</p>
              </Col>
            </Row>
            <Row className="category-list-data bl-3">
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
                <Button ghost size="large" className="category-list-button bgc-3">실천 완료하기</Button>
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
            src={board0302}
            preview={false}
          />
          <p className="category-stamp-title">3040세대 <Text className='color-3'>스티커판</Text></p>
          <p className="category-stamp-content">스티커를 모두 모으시면 뱃지가 지급됩니다.</p>
          <Row className="category-stamp-bottom">
            <Col span={24}>
              <Row className="category-stamp-count">
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

export default CategoryYoungAdult;