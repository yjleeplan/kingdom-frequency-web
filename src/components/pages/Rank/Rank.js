import { Col, Row, Typography, Image, Card, message } from "antd";
import _ from "lodash";
import React, { useState, useEffect } from "react";
import * as api from "../../../api";
import iconBaseball from '../../../assets/images/icon_game_baseball.png';
import iconBasketball from '../../../assets/images/icon_game_basketball.png';
import iconDart from '../../../assets/images/icon_game_dart.png';
import iconGolf from '../../../assets/images/icon_game_golf.png';
import iconPaper from '../../../assets/images/icon_game_paper.png';
import iconShoot from '../../../assets/images/icon_game_shoot.png';

const { Text } = Typography;

const Rank = ({ setIsLoading }) => {
  /** State */
  const [resultData, setResultData] = useState({list1 : [], list2 : [], list3 : [], list4 : [], list5 : [], list6 : []});

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
      <Image className="icon-game-basketball" width={170} src={iconBasketball} preview={false}/>
      <Image className="icon-game-baseball" width={150} src={iconBaseball} preview={false}/>
      <Image className="icon-game-dart" width={160} src={iconDart} preview={false}/>
      <Image className="icon-game-shoot" width={170} src={iconShoot} preview={false}/>
      <Image className="icon-game-paper" width={170} src={iconPaper} preview={false}/>
      <Image className="icon-game-golf" width={170} src={iconGolf} preview={false}/>
      <Row className="rank-header">
        <Col span={24}>
          <span>선</span><span>교</span> <span>올</span><span>림</span><span>픽</span>
        </Col>
      </Row>
      <Row className="rank-content">
        <Col span={8} className="rank-card rank-card-1 pl-50 pr-25">
          <Card
            title="높이 더 높이"
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
        <Col span={8} className="rank-card rank-card-5 pl-25 pr-25">
          <Card
            title="복음투수"
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
                  <Col span={9} className="rank-list-data-col-2">{item['name']}</Col>
                  <Col span={12}  className="rank-list-data-col-3">{item['point'].toLocaleString('ko-KR')}</Col>
                </Row>
              );
            })}
          </Card>
        </Col>
        <Col span={8} className="rank-card rank-card-4 pl-50 pr-25 mt-30">
          <Card
            title="적그리스도를 저격"
            bordered={false}
          >
            {_.map(resultData.list4, (item, index) => {
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
        <Col span={8} className="rank-card rank-card-6 pl-25 pr-25 mt-30">
          <Card
            title={
              <>
                <Row><Col span={18}>나는야 사람을</Col><Col span={6}></Col></Row>
                <Row><Col span={4}></Col><Col span={20}>낚는 어부</Col></Row>
              </>
            }
            bordered={false}
          >
            {_.map(resultData.list5, (item, index) => {
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
        <Col span={8} className="rank-card rank-card-2 pl-25 pr-50 mt-30">
          <Card
            title={
              <>
                <Row><Col span={18}>내가 품은</Col><Col span={6}></Col></Row>
                <Row><Col span={5}></Col><Col span={19}>선교지를 향해서</Col></Row>
              </>
            }
            bordered={false}
          >
            {_.map(resultData.list6, (item, index) => {
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