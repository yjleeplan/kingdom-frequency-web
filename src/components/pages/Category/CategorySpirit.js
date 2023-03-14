import { Col, Row, Typography, Card, Image, Button, Radio  } from "antd";
import _ from "lodash";
import React, { useState } from "react";
import logoCategory02 from "../../../assets/images/logo_category_02.png";
import board0201 from "../../../assets/images/board/board_02_01.png";

const { Text } = Typography;

const tmpData = [
  { missionId : "m001", missionDesc : "매월 마지막주 수요지성소기도회, 토요새벽연합예배 사수하기 (무조건이야 챌린지)" },
  { missionId : "m002", missionDesc : "말아톤 프로젝트 매일 빠지지 않고 참여하기" },
  { missionId : "m003", missionDesc : "내 주변 복음을 전할 태신자 작성하기 (SEED 챌린지)" },
  { missionId : "m004", missionDesc : "기도 짝꿍 정하기 (시너지 효과)" },
  { missionId : "m005", missionDesc : "예배 10분 전 도착하여 그날 예배를 위해 기도하기" }
];

const CategorySpirit = ({ history, setIsLoading }) => {
  return (
    <>
      <Row className="category-info">
        <Col span={24}>
          <p className="category-info-title">영성</p>
          <p className="category-info-subtitle">Spirit</p>
          <p className="category-info-content mt-20">우리가 꿈꾸는 하나님의 나라는 우리 안에 있습니다.</p>
          <p className="category-info-content">성령께서 우리 한 사람, 한 사람의 믿음의 결단을 통해</p>
          <p className="category-info-content">새 일을 행하심을 믿음으로 바라보며 결단합니다.</p>
        </Col>
      </Row>
      <Row className="category-logo">
        <Col span={24}>
          <Image
            width={"90%"}
            height={"100%"}
            src={logoCategory02}
            preview={false}
          />
        </Col>
      </Row>
      <Row className="category-list">
        <Col span={24}>
          <Card bordered={false}>
            <Row>
              <Col span={24}>
                <p className="category-list-title">영성 <Text className='color-2'>실천 항목</Text></p>
                <p className="category-list-subtitle"><Text className="underline">매주 각 영역마다</Text> 새롭게 도전함으로 진행됩니다.</p>
                <p className="category-list-content">1. 한 주에 한 번 아래에 있는 실천항목을 실천합니다.</p>
                <p className="category-list-content">2. 실천한 항목을 선택 후 '실천 완료하기' 버튼을 누릅니다.</p>
                <p className="category-list-content">3. 완료 후 하단의 스티커판을 확인합니다.</p>
              </Col>
            </Row>
            <Row className="category-list-data bl-2">
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
                <Button ghost size="large" className="category-list-button bgc-2">실천 완료하기</Button>
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
            src={board0201}
            preview={false}
          />
          <p className="category-stamp-title">영성 <Text className='color-2'>스티커판</Text></p>
          <p className="category-stamp-content">스티커를 모두 모으시면 뱃지가 지급됩니다.</p>
          <Row className="category-stamp-bottom">
            <Col span={24}>
              <Row className="category-stamp-count bgc-2">
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

export default CategorySpirit;
