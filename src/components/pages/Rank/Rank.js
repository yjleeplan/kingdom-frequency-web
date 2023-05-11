import { Col, Row, Typography, Image, Card } from "antd";
import _ from "lodash";
import React, { useState, useEffect } from "react";
import * as api from "../../../api";

const { Text } = Typography;

const Rank = ({ setIsLoading, userData }) => {
  const tempData = [
    {
      rank: "1",
      name: "김민주",
      age: "15",
      point: "1,500"
    },
    {
      rank: "2",
      name: "이정익",
      age: "12",
      point: "1,200"
    },
    {
      rank: "3",
      name: "이태우",
      age: "30",
      point: "900"
    },
    {
      rank: "4",
      name: "임세현",
      age: "23",
      point: "800"
    },
    {
      rank: "5",
      name: "최수정",
      age: "27",
      point: "700"
    },
    {
      rank: "6",
      name: "최정은",
      age: "45",
      point: "500"
    },
    {
      rank: "7",
      name: "김선규",
      age: "61",
      point: "400"
    },
    {
      rank: "8",
      name: "이정인",
      age: "18",
      point: "300"
    },
    {
      rank: "9",
      name: "김민영",
      age: "15",
      point: "200"
    },
    {
      rank: "10",
      name: "김민영",
      age: "49",
      point: "50"
    },
  ];

  /** State */
  const [resultData, setResultData] = useState({list1 : [], list2 : [], list3 : []});

  /** Effect */
  useEffect(() => {
    let data = {
      list1: tempData,
      list2: tempData,
      list3: tempData
    };
    setResultData(data);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Row className="rank-header">
        <Col span={24}>
          <span>트</span><span>리</span><span>니</span><span>티</span> <span>게</span><span>임</span><span>존</span>
        </Col>
      </Row>
      <Row className="rank-content">
        <Col span={8} className="rank-card rank-card-1 pl-20 pr-10">
          <Card
            title="농구"
            bordered={false}
          >
            {_.map(resultData.list1, (item, index) => {
              const rank = index === 0 ? "rank rank1" : index === 1 ? "rank rank2" : index === 2 ? "rank rank3" : "";

              return (
                <Row key={index} className={`rank-list-data-row ${rank}`}>
                  <Col span={3}  className="rank-list-data-col-1">{item['rank']}</Col>
                  <Col span={15} className="rank-list-data-col-2">{item['name']} <Text>({item['age']}세)</Text></Col>
                  <Col span={6}  className="rank-list-data-col-3">{item['point']}</Col>
                </Row>
              );
            })}
          </Card>
        </Col>
        <Col span={8} className="rank-card rank-card-2 pl-10 pr-10">
          <Card
            title="제기차기"
            bordered={false}
          >
            {_.map(resultData.list2, (item, index) => {
              const rank = index === 0 ? "rank rank1" : index === 1 ? "rank rank2" : index === 2 ? "rank rank3" : "";

              return (
                <Row key={index} className={`rank-list-data-row ${rank}`}>
                  <Col span={3}  className="rank-list-data-col-1">{item['rank']}</Col>
                  <Col span={15} className="rank-list-data-col-2">{item['name']} <Text>({item['age']}세)</Text></Col>
                  <Col span={6}  className="rank-list-data-col-3">{item['point']}</Col>
                </Row>
              );
            })}
          </Card>
        </Col>
        <Col span={8} className="rank-card rank-card-3 pl-10 pr-20">
          <Card
            title="다트"
            bordered={false}
          >
            {_.map(resultData.list3, (item, index) => {
              const rank = index === 0 ? "rank rank1" : index === 1 ? "rank rank2" : index === 2 ? "rank rank3" : "";

              return (
                <Row key={index} className={`rank-list-data-row ${rank}`}>
                  <Col span={3}  className="rank-list-data-col-1">{item['rank']}</Col>
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