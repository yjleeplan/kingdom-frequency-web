import { Col, Row, Typography, Card, Image, Button, Radio  } from "antd";
import _ from "lodash";
import React, { useState } from "react";
import logoCategory01 from "../../../assets/images/logo_category_01.png";
import Board from "../../common/Board";

const { Text } = Typography;

const CategoryMzGeneration = ({ missionCode, missionList, count, isDisabled, checkedSeq }) => {
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
                {_.map(missionList, (item, index) => {
                  const last = (index + 1) < missionList.length ? "" : "last";
                  const even = (index + 1) % 2 !== 0 ? "" : "even";

                  return (
                    <Row key={index} className={`category-list-data-row ${even} ${last}`}>
                      <Col span={1}  className="category-list-data-col-1">·</Col>
                      <Col span={21} className="category-list-data-col-2">{item['desc']}</Col>
                      <Col span={2}  className="category-list-data-col-3">
                        <Radio disabled={isDisabled} checked={item['seq'] === checkedSeq}></Radio>
                      </Col>
                    </Row>
                  );
                })}
              </Col>
            </Row>
            <Row className="category-list-bottom">
              <Col span={24}>
              <Button
                  ghost
                  size="large"
                  className="category-list-button bgc-1"
                  disabled={isDisabled}
                >
                  실천 완료하기
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row className="category-stamp">
        <Col span={24}>
          <Board missionCode={missionCode} count={count} />
          <p className="category-stamp-title">다음 세대 <Text className='color-1'>스티커판</Text></p>
          <p className="category-stamp-content">스티커를 모두 모으시면 뱃지가 지급됩니다.</p>
          <Row className="category-stamp-bottom">
            <Col span={24}>
              <Row className="category-stamp-count bgc-1">
                <Col span={15}>현재 나의 스티커 갯수</Col>
                <Col span={2} className="category-stamp-count-bar"></Col>
                <Col span={7}>{count}개</Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default CategoryMzGeneration;
