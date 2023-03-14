import { Col, Row, Typography, Card, Image, Button, Radio  } from "antd";
import _ from "lodash";
import React, { useState } from "react";
import logoCategory04 from "../../../assets/images/logo_category_04.png";
import board0401 from "../../../assets/images/board/board_04_01.png";

const { Text } = Typography;

const tmpData = [
  { missionId : "m001", missionDesc : "일회용품 안쓰는 날 (텀블러 사용 데이 - 매월 둘째 주일)" },
  { missionId : "m002", missionDesc : "교회 절전의 날 (매월 첫째 주)" },
  { missionId : "m003", missionDesc : "대중교통의 날 (매월 첫째 주 주일, 사랑의 만남 주일)" },
  { missionId : "m004", missionDesc : "아무렇게나 버려진 쓰레기 10개 줍기" },
  { missionId : "m005", missionDesc : "교회 분리수거함 잘 정리하기" },
  { missionId : "m006", missionDesc : "불이 켜진 채 방치된 곳 소등하기" },
  { missionId : "m007", missionDesc : "엘리베이터 타지 않고 계단 이용하기" },
  { missionId : "m008", missionDesc : "양치할 때 컵을 이용해서 물 절약하기" },
  { missionId : "m009", missionDesc : "장바구니를 이용해서 장 보기(일회용 비닐봉투 사용하지 않기)" },
  { missionId : "m010", missionDesc : "운전할 때 공회전/급과속/급정거 하지 않기(매연 절감)" }
];

const CategoryClimate = ({ history, setIsLoading }) => {
  return (
    <>
      <Row className="category-info">
        <Col span={24}>
          <p className="category-info-title">기후</p>
          <p className="category-info-subtitle">Climate</p>
          <p className="category-info-content mt-20">우리가 매일 발을 딛고 살아가는 이 땅,</p>
          <p className="category-info-content">이곳에도 하나님의 나라가 임하기를 원합니다.</p>
          <p className="category-info-content mt-20">교회와 성도를 섬기듯 이 땅을 섬길 것을</p>
          <p className="category-info-content">함께 결단하며 나아갑니다.</p>
        </Col>
      </Row>
      <Row className="category-logo">
        <Col span={24}>
          <Image
            width={"90%"}
            height={"100%"}
            src={logoCategory04}
            preview={false}
          />
        </Col>
      </Row>
      <Row className="category-list">
        <Col span={24}>
          <Card bordered={false}>
            <Row>
              <Col span={24}>
                <p className="category-list-title">기후 <Text className='color-4'>실천 항목</Text></p>
                <p className="category-list-subtitle"><Text className="underline">매주 각 영역마다</Text> 새롭게 도전함으로 진행됩니다.</p>
                <p className="category-list-content">1. 한 주에 한 번 아래에 있는 실천항목을 실천합니다.</p>
                <p className="category-list-content">2. 실천한 항목을 선택 후 '실천 완료하기' 버튼을 누릅니다.</p>
                <p className="category-list-content">3. 완료 후 하단의 스티커판을 확인합니다.</p>
              </Col>
            </Row>
            <Row className="category-list-data bl-4">
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
                <Button ghost size="large" className="category-list-button bgc-4">실천 완료하기</Button>
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
            src={board0401}
            preview={false}
          />
          <p className="category-stamp-title">기후 <Text className='color-4'>스티커판</Text></p>
          <p className="category-stamp-content">스티커를 모두 모으시면 뱃지가 지급됩니다.</p>
          <Row className="category-stamp-bottom">
            <Col span={24}>
              <Row className="category-stamp-count bgc-4">
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

export default CategoryClimate;
