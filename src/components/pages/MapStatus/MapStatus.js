import { Col, Row, Image, Tabs, message, Button } from "antd";
import _ from "lodash";
import React, { useState, useEffect } from "react";
import * as api from "../../../api";
import title from "../../../assets/images/title_mapstatus.png";
import FlagImage from "../../common/FlagImage";
import { SyncOutlined } from '@ant-design/icons';

const MapStatus = ({ setIsLoading, userData }) => {
  // Tab Items
  const tabItems = [
    {
      label: "조별",
      children: "",
      key: "team"
    },
    {
      label: "나라별",
      children: "",
      key: "country"
    },
  ];

  let timer;

  /** State */
  const [activeKey, setActiveKey] = useState("team");
  const [teamList, setTeamList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState({});

  // 탭 내용 생성
  const generateItems = () => {
    let children = "";

    if (activeKey === 'team') {
      children = _.map(teamList, (item, index) => {
        return (
          <Row
            key={index}
            className="team-info-row"
            //onClick={(event) => onSelectedTeam(event, item, index)}
          >
            <Col span={3} className="team-info-col-1">
              <input
                className="team-color-input"
                type="color"
                value={item.team_color}
                disabled
              />
            </Col>
            <Col span={4} className="team-info-col-2">
              <span>{item.team_no}조</span>
            </Col>
            <Col span={5} className="team-info-col-3">
              <span style={{color: '#454545', paddingLeft: '10px'}}>[{item.team_total}개]</span>
            </Col>
            <Col span={12} className="team-info-col-4">
              <span style={{color: '#9E9FA5'}}>{item.team_current}</span>
            </Col>
          </Row>
        )
      });
    } else {
      children = _.map(countryList, (item, index) => {
        return (
          <Row key={index} className="country-info-row">
            <Col span={20} className="country-info-col-1">
              <FlagImage
                size={24}
                name={item.country_name}
              />
              <span style={{color: item.country_team_no ? '#000' : '#9E9FA5'}}>{item.country_name}</span>
            </Col>
            <Col span={4} className="">
              <span>{item.country_team_no ? item.country_team_no + '조' : ''}</span>
            </Col>
          </Row>
        )
      });
    }

    tabItems[_.findIndex(tabItems, { 'key' : activeKey })].children = children;

    return tabItems;
  };

  // 탭 선택
  const handleChange = (key) => {
    setActiveKey(key);
  };

  // 팀 목록 조회
  const selectTeamList = async () => {
    try {
      const { data } = await api.listTeam({
        query: {
          order_by_column: 'team_total',
          order_by_value: 'desc'
        },
      });

      setTeamList(data);
    } catch (error) {
      message.error(error.message);
    }
  };

  // 나라 목록 조회
  const selectCountryList = async () => {
    try {
      const { data } = await api.listCountry({});

      setCountryList(data);
    } catch (error) {
      message.error(error.message);
    }
  };

  // 새로고침
  const onRefresh = () => {
    selectTeamList();
    selectCountryList();
  };

  /** Effect */
  useEffect(() => {
    selectTeamList();
    selectCountryList();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="map-status-refresh">
        <Button>
          <SyncOutlined onClick={onRefresh}/>
        </Button>
      </div>
      <Row className="map-status-title">
        <Col span={24}>
          <Image
            width={120}
            height={70}
            src={title}
            preview={false}
          />
        </Col>
      </Row>
      <Tabs
        type="card"
        onChange={handleChange}
        activeKey={activeKey}
        items={generateItems()}
      />
    </>
  );
};

export default MapStatus;
