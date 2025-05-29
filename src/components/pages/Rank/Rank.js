import { Col, Row, Image, Card, message } from "antd";
import _ from "lodash";
import React, { useState, useEffect } from "react";
import * as api from "../../../api";
import IconBasketball from '../../../assets/images/icon_game_basketball.png';
import IconPunch from "../../../assets/images/icon_game_punch.png";
import IconMole from "../../../assets/images/icon_game_mole.png";

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
      const { data } = await api.listRank({});

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
      <Image className="icon-game-basketball" width={170} src={IconBasketball} preview={false}/>
      <Image className="icon-game-punch" width={170} src={IconPunch} preview={false}/>
      <Image className="icon-game-mole" width={200} src={IconMole} preview={false}/>
      <Row className="rank-header">
        <Col span={24}>
          <span>선</span><span>교</span> <span>올</span><span>림</span><span>픽</span>
        </Col>
      </Row>
      <Row className="rank-content">
        <Col span={8} className="rank-card rank-card-1 pl-50 pr-25">
          <Card
            title="농구"
            bordered={false}
          >
            {_.map(resultData.list1, (item, index) => {
              const rank = index === 0 ? "rank rank1" : index === 1 ? "rank rank2" : index === 2 ? "rank rank3" : "";

              return (
                <Row key={index} className={`rank-list-data-row ${rank}`}>
                  <Col span={3}  className="rank-list-data-col-1">{index + 1}</Col>
                  <Col span={9} className="rank-list-data-col-2">{item['name']}</Col>
                  <Col span={12}  className="rank-list-data-col-3">{item['point'].toLocaleString('ko-KR')}</Col>
                </Row>
              );
            })}
          </Card>
        </Col>
        <Col span={8} className="rank-card rank-card-6 pl-25 pr-25">
          <Card
            title="펀치"
            bordered={false}
          >
            {_.map(resultData.list2, (item, index) => {
              const rank = index === 0 ? "rank rank1" : index === 1 ? "rank rank2" : index === 2 ? "rank rank3" : "";

              return (
                <Row key={index} className={`rank-list-data-row ${rank}`}>
                  <Col span={3}  className="rank-list-data-col-1">{index + 1}</Col>
                  <Col span={9} className="rank-list-data-col-2">{item['name']}</Col>
                  <Col span={12}  className="rank-list-data-col-3">{item['point'].toLocaleString('ko-KR')}</Col>
                </Row>
              );
            })}
          </Card>
        </Col>
        <Col span={8} className="rank-card rank-card-3 pl-25 pr-50">
          <Card
            title="두더지 잡기"
            bordered={false}
          >
            {_.map(resultData.list3, (item, index) => {
              const rank = index === 0 ? "rank rank1" : index === 1 ? "rank rank2" : index === 2 ? "rank rank3" : "";

              return (
                <Row key={index} className={`rank-list-data-row ${rank}`}>
                  <Col span={3}  className="rank-list-data-col-1">{index + 1}</Col>
                  <Col span={9} className="rank-list-data-col-2">{item['name']}</Col>
                  <Col span={12}  className="rank-list-data-col-3">{item['point'].toLocaleString('ko-KR')}</Col>
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