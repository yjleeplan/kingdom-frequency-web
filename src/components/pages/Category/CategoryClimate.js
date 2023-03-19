import { Col, Row, Typography, Card, Image, Button, Radio, message  } from "antd";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import logoCategory04 from "../../../assets/images/logo_category_04.png";
import Board from "../../common/Board";

const { Text } = Typography;

const CategoryClimate = ({
  missionCode,
  missionList,
  count,
  isDisabled,
  checkedMissionId,
  setCheckedMissionId,
  onClick
}) => {
  // 라디오 버튼 Change
  const handleRadioChange = ({ target }) => {
    setCheckedMissionId(target.value);
  };

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
                {_.map(missionList, (item, index) => {
                  const last = (index + 1) < missionList.length ? "" : "last";
                  const even = (index + 1) % 2 !== 0 ? "" : "even";

                  return (
                    <Row key={index} className={`category-list-data-row ${even} ${last}`}>
                      <Col span={1}  className="category-list-data-col-1">·</Col>
                      <Col span={21} className="category-list-data-col-2">{item['desc']}</Col>
                      <Col span={2}  className="category-list-data-col-3">
                        <Radio
                          disabled={isDisabled}
                          value={item['id']}
                          checked={item['id'] === checkedMissionId}
                          onChange={handleRadioChange}
                        >
                        </Radio>
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
                  className="category-list-button bgc-4"
                  disabled={isDisabled}
                  onClick={onClick}
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
          <p className="category-stamp-title">기후 <Text className='color-4'>스티커판</Text></p>
          <p className="category-stamp-content">스티커를 모두 모으시면 뱃지가 지급됩니다.</p>
          <Row className="category-stamp-bottom">
            <Col span={24}>
              <Row className="category-stamp-count bgc-4">
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

export default CategoryClimate;
