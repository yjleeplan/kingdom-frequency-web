import { Col, Row, Typography, Image, Card, message } from "antd";
import _ from "lodash";
import React, { useState, useEffect } from "react";
import * as api from "../../../api";

const { Text } = Typography;

const Rank = ({ setIsLoading }) => {
  /** State */
  const [resultData, setResultData] = useState({list1 : [], list2 : [], list3 : []});

  /** Effect */
  useEffect(() => {
    handleGetRankList();
    setInterval(() => handleGetRankList(), 10000);
    // eslint-disable-next-line
  }, []);

  // 랭킹 조회
  const handleGetRankList = async () => {
    try {
      const { data } = await api.listRank();

      setResultData(data);
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
      <Row className="rank-header">
        <Col span={24}>
          <span>트</span><span>리</span><span>니</span><span>티</span> <span>게</span><span>임</span><span>존</span>
        </Col>
      </Row>
      <Row className="rank-content">
        <Col span={8} className="rank-card rank-card-1 pl-50 pr-25">
          <Card
            title="미니게임 3종"
            bordered={false}
          >
            {_.map(resultData.list1, (item, index) => {
              const rank = index === 0 ? "rank rank1" : index === 1 ? "rank rank2" : index === 2 ? "rank rank3" : "";

              return (
                <Row key={index} className={`rank-list-data-row ${rank}`}>
                  <Col span={3}  className="rank-list-data-col-1">{index + 1}</Col>
                  <Col span={15} className="rank-list-data-col-2">{item['name']} <Text>({item['age']}세)</Text></Col>
                  <Col span={6}  className="rank-list-data-col-3">{item['point']}</Col>
                </Row>
              );
            })}
          </Card>
        </Col>
        <Col span={8} className="rank-card rank-card-2 pl-25 pr-25">
          <Card
            title="선교를 향하여 ~ 골링!!"
            bordered={false}
          >
            {_.map(resultData.list2, (item, index) => {
              const rank = index === 0 ? "rank rank1" : index === 1 ? "rank rank2" : index === 2 ? "rank rank3" : "";

              return (
                <Row key={index} className={`rank-list-data-row ${rank}`}>
                  <Col span={3}  className="rank-list-data-col-1">{index + 1}</Col>
                  <Col span={15} className="rank-list-data-col-2">{item['name']} <Text>({item['age']}세)</Text></Col>
                  <Col span={6}  className="rank-list-data-col-3">{item['point']}</Col>
                </Row>
              );
            })}
          </Card>
        </Col>
        <Col span={8} className="rank-card rank-card-3 pl-25 pr-50">
          <Card
            title={
              <>
                <Row><Col span={18}>사랑이 POP!</Col><Col span={6}></Col></Row>
                <Row><Col span={6}></Col><Col span={18}>풍선이 POP!</Col></Row>
              </>
            }
            bordered={false}
          >
            {_.map(resultData.list3, (item, index) => {
              const rank = index === 0 ? "rank rank1" : index === 1 ? "rank rank2" : index === 2 ? "rank rank3" : "";

              return (
                <Row key={index} className={`rank-list-data-row ${rank}`}>
                  <Col span={3}  className="rank-list-data-col-1">{index + 1}</Col>
                  <Col span={15} className="rank-list-data-col-2">{item['name']} <Text>({item['age']}세)</Text></Col>
                  <Col span={6}  className="rank-list-data-col-3">{item['point']}</Col>
                </Row>
              );
            })}
          </Card>
        </Col>
      </Row>
    </>
  );
};
  
export default Rank;