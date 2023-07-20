import { Col, Row, Image, Card, message } from "antd";
import _ from "lodash";
import React, { useState, useEffect } from "react";
import * as api from "../../../api";
import title from "../../../assets/images/title_childhood.png";

const dummyData = [
  {
    name: '1조',
    point: '90,000'
  },
  {
    name: '2조',
    point: '70,000'
  },
  {
    name: '3조',
    point: '65,000'
  },
  {
    name: '4조',
    point: '64,000'
  },
  {
    name: '5조',
    point: '60,000'
  },
  {
    name: '6조',
    point: '57,000'
  },
  {
    name: '7조',
    point: '57,000'
  },
  {
    name: '8조',
    point: '55,000'
  },
];

const Childhood2 = ({ setIsLoading }) => {
  /** State */
  const [resultData, setResultData] = useState(dummyData);

  /** Effect */
  useEffect(() => {
    //handleGetRankList();
    //setInterval(() => handleGetRankList(), 10000);
    // eslint-disable-next-line
  }, []);

  // 랭킹 조회
  const handleGetRankList = async () => {
    try {
      const { data } = await api.listRank();

      //setResultData(data.list1);
    } catch (error) {
      message.error(
        error.response
          ? `${error.response.data.code}, ${error.response.data.message}`
          : "랭킹 조회 실패"
      );
    } finally {

    }
  };

  return (
    <>
      <Row className="childhood-header">
        <Col span={24}>
          <Image width={450} height={206} src={title} preview={false} />
        </Col>
      </Row>
      <Row className="childhood-content">
        <Col span={12} className="rank-card pl-50 pr-25">
          <Card
            className="mt-20"
            title="조별 랭킹"
            bordered={false}
          >
            {_.map(resultData, (item, index) => {
              const rank = index === 0 ? "rank rank1" : index === 1 ? "rank rank2" : index === 2 ? "rank rank3" : "";

              if (index < 4) {
                return (
                  <Row key={index} className={`rank-list-data-row ${rank}`}>
                    <Col span={3}  className="rank-list-data-col-1">{index + 1}</Col>
                    <Col span={10} className="rank-list-data-col-2">{item['name']}</Col>
                    <Col span={11}  className="rank-list-data-col-3">{item['point']}</Col>
                  </Row>
                );
              }
            })}
          </Card>
        </Col>
        <Col span={12} className="rank-card pl-25 pr-50">
          <Card
            className="mt-20"
            title="조별 랭킹"
            bordered={false}
          >
            {_.map(resultData, (item, index) => {
              const rank = index === 0 ? "rank rank1" : index === 1 ? "rank rank2" : index === 2 ? "rank rank3" : "";

              if (index > 3) {
                return (
                  <Row key={index} className={`rank-list-data-row ${rank}`}>
                    <Col span={3}  className="rank-list-data-col-1">{index + 1}</Col>
                    <Col span={10} className="rank-list-data-col-2">{item['name']}</Col>
                    <Col span={11}  className="rank-list-data-col-3">{item['point']}</Col>
                  </Row>
                );
              }
            })}
          </Card>
        </Col>
      </Row>
    </>
  );
};
  
export default Childhood2;