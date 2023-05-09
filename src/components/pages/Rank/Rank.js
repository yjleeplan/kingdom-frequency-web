import { Col, Row, Typography, Image, Card } from "antd";
import _ from "lodash";
import React, { useState, useEffect } from "react";
import * as api from "../../../api";

const { Text } = Typography;

const Rank = ({ setIsLoading, userData }) => {
  const tempData = [
    {
      rank: "1",
      name: "UserName1",
      age: "15",
      point: "1,500"
    },
    {
      rank: "2",
      name: "UserName2",
      age: "12",
      point: "1,200"
    },
    {
      rank: "3",
      name: "UserName3",
      age: "30",
      point: "900"
    },
    {
      rank: "4",
      name: "UserName4",
      age: "23",
      point: "800"
    },
    {
      rank: "5",
      name: "UserName5",
      age: "27",
      point: "700"
    },
    {
      rank: "6",
      name: "UserName6",
      age: "45",
      point: "500"
    },
    {
      rank: "7",
      name: "UserName7",
      age: "61",
      point: "400"
    },
    {
      rank: "8",
      name: "UserName8",
      age: "18",
      point: "300"
    },
    {
      rank: "9",
      name: "UserName9",
      age: "15",
      point: "200"
    },
    {
      rank: "10",
      name: "UserName10",
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
        <Col span={8} className="rank-card pl-20 pr-10">
          <Card
            title="농구"
            bordered={false}
          >
            {_.map(resultData.list1, (item, index) => {
              const rank = index === 0 ? "rank1" : "";

              return (
                <Row key={index} className={`rank-list-data-row ${rank}`}>
                  <Col span={4}  className="rank-list-data-col-1">{item['rank']}</Col>
                  <Col span={14} className="rank-list-data-col-2">{item['name']} <Text>({item['age']}세)</Text></Col>
                  <Col span={6}  className="rank-list-data-col-3">{item['point']}</Col>
                </Row>
              );
            })}
          </Card>
        </Col>
        <Col span={8} className="rank-card pl-10 pr-10">
          <Card
            title="제기차기"
            bordered={false}
          >
            {_.map(resultData.list2, (item, index) => {
              const rank = index === 0 ? "rank1" : "";

              return (
                <Row key={index} className={`rank-list-data-row ${rank}`}>
                  <Col span={4}  className="rank-list-data-col-1">{item['rank']}</Col>
                  <Col span={14} className="rank-list-data-col-2">{item['name']} <Text>({item['age']}세)</Text></Col>
                  <Col span={6}  className="rank-list-data-col-3">{item['point']}</Col>
                </Row>
              );
            })}
          </Card>
        </Col>
        <Col span={8} className="rank-card pl-10 pr-20">
          <Card
            title="다트"
            bordered={false}
          >
            {_.map(resultData.list3, (item, index) => {
              const rank = index === 0 ? "rank1" : "";

              return (
                <Row key={index} className={`rank-list-data-row ${rank}`}>
                  <Col span={4}  className="rank-list-data-col-1">{item['rank']}</Col>
                  <Col span={14} className="rank-list-data-col-2">{item['name']} <Text>({item['age']}세)</Text></Col>
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