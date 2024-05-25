import { Col, Row, Card, message } from "antd";
import _ from "lodash";
import React, { useState, useEffect } from "react";
import * as api from "../../../api";

const groupA = [1,2,3,4,5,6,7,8,9,10];
const groupB = [11,12,13,14,15,16,17,18,19,20];

const RankDetail = ({ setIsLoading, type }) => {
  /** State */
  const [resultData, setResultData] = useState([]);

  /** Effect */
  useEffect(() => {
    handleGetRankList();
    setInterval(() => handleGetRankList(), 10000);
    // eslint-disable-next-line
  }, []);

  // 랭킹 조회
  const handleGetRankList = async () => {
    try {
      const { data } = await api.listRank({
        query: {
          limit: 20
        }
      });

      setResultData(data?.[`list${type}`]);
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
      <Row className="rank-detail-content">
        <Col span={2}></Col>
        <Col span={10} className="rank-detail-card">
          <Card
            title={false}
            bordered={false}
          >
            {_.map(groupA, (item, index) => {
              const rank = index === 0 ? "rank rank1" : index === 1 ? "rank rank2" : index === 2 ? "rank rank3" : "";

              return (
                <Row key={item} className={`rank-list-data-row ${rank}`}>
                  <Col span={3}  className="rank-list-data-col-1">{item}</Col>
                  <Col span={9} className="rank-list-data-col-2">{resultData[index]?.['name']}</Col>
                  <Col span={12}  className="rank-list-data-col-3">{resultData[index]?.['point'].toLocaleString('ko-KR')}</Col>
                </Row>
              );
            })}
          </Card>
        </Col>
        <Col span={10} className="rank-detail-card">
          <Card
            title={false}
            bordered={false}
          >
            {_.map(groupB, (item, index) => {
              return (
                <Row key={item} className={`rank-list-data-row`}>
                  <Col span={3}  className="rank-list-data-col-1">{item}</Col>
                  <Col span={9} className="rank-list-data-col-2">{resultData[index + 10]?.['name']}</Col>
                  <Col span={12}  className="rank-list-data-col-3">{resultData[index + 10]?.['point'].toLocaleString('ko-KR')}</Col>
                </Row>
              );
            })}
          </Card>
        </Col>
        <Col span={2}></Col>
      </Row>
    </>
  );
};
  
export default RankDetail;