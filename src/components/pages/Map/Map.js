import _ from "lodash";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { MapContainer , GeoJSON, Marker, Popup, useMapEvents } from "react-leaflet";
import countries from "./data/countries.json";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Col, Row, Input, Modal, message } from "antd";
import { FullscreenOutlined, SwapRightOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import TeamDeleteModal from "../../common/modal/TeamDeleteModal/TeamDeleteModal";
import * as api from "../../../api";
import FlagImage from "../../common/FlagImage";

const { Search } = Input;

const Map = ({ setIsLoading }) => {
  /** State */
  const [teamList, setTeamList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState({});
  const [teamDeleteModalVisible, setTeamDeleteModalVisible] = useState(false);
  const mapRef = useRef();
  const geoJsonRef = useRef();

  // 지도 줌 레벨 및 중앙값 초기화
  const initZoom = () => {
    mapRef.current.flyTo([51.505, -0.09], 2);
  }

  // 팀 선택
  const onSelectedTeam = (event, item, index) => {
    setSelectedTeam(item);
  };

  // 나라 선택
  const onSelectedCountry = (event) => {
    console.log(event.target);

    event.target.setStyle({
      color: '#000',
      fillColor: selectedTeam.team_color,
    });
  };

  // 지도에 그려지는 각 Feature에 대한 설정
  const onEachFeature = (feature, layer) => {
    layer.bindPopup(feature.properties.NAME);
    layer.setStyle({
      color: '#000',
      fillColor: '#F9F9F9',
      fillOpacity: 1,
      weight: 1.2,
      dashArray: 1,
    });
    // layer.on({
    //   click: selectedCountry,
    //   //mouseover: selectedCountry,
    // });
  };

  // 팀 나라 삭제 모달 오픈
  const handleTeamDeleteModalOpen = () => {
    setTeamDeleteModalVisible(true);
  };

  // 팀 나라 삭제 모달 닫기
  const handleTeamDeleteModalClose = () => {
    setTeamDeleteModalVisible(false);
  };

  // 팀 나라 삭제
  const onDelete = () => {
    selectTeamList();
    selectCountryList();
  };

  // 검색
  const onSearch = (value) => {
    const layers = geoJsonRef.current.getLayers();
    const searchedLayer = _.chain(layers)
                           .filter((o) => { return value === o.feature.properties.NAME })
                           .head()
                           .value()
    ;

    // 검색 결과가 존재하는 경우
    if (searchedLayer) {
      console.log(searchedLayer.getCenter());

      // 좌표로 이동
      mapRef.current.flyTo(searchedLayer.getCenter(), 4);

      // Confirm 창 오픈
      Modal.confirm({
        className: "confirm-search-result",
        icon: false,
        title: `${selectedTeam.team_no}조`,
        content:
          <>
            <FlagImage
              size={40}
              name={value}
            />
            {value}
          </>
        ,
        okText: "복음화",
        cancelText: "취소",
        onOk: async () => {
          try {
            await api.addCountry({
              data: {
                team_no: selectedTeam.team_no,
                country_name: value
              },
            });

            selectTeamList();
            selectCountryList();

            message.success("복음화되었습니다.");
          } catch (error) {
            message.error(error.response.data.message);
          }
        },
        onCancel: async () => {
          try {
            await api.updateCurrent({
              data: {
                team_no: selectedTeam.team_no,
                country_name: value
              },
            });

            selectTeamList();

            message.success("현재위치가 변경되었습니다.");
          } catch (error) {
            message.error(error.response.data.message);
          }
        },
      });
    } else {
      message.error("검색 결과가 없습니다.");
    }
  };

  // 팀 목록 조회
  const selectTeamList = async (isLoaded = true) => {
    try {
      const { data } = await api.listTeam({
        query: {
          order_by_column: 'team_no',
          order_by_value: 'asc'
        },
      });

      setTeamList(data);
      !isLoaded && setSelectedTeam(data[0]);
    } catch (error) {
      throw new Error(
        error.response
          ? `${error.response.data.code}, ${error.response.data.message}`
          : "팀 목록 조회 실패"
      );
    }
  };

  // 나라 목록 조회
  const selectCountryList = async () => {
    try {
      const { data } = await api.listCountry({});

      setCountryList(data);

      const layers = geoJsonRef.current.getLayers();
      let searchedLayer = {};

      _.map(data, (item, index) => {
        searchedLayer = _.chain(layers)
                         .filter((o) => { return item.country_name === o.feature.properties.NAME })
                         .head()
                         .value()
        ;

        if (searchedLayer) {
          searchedLayer.setStyle({ fillColor: item.country_team_color ? item.country_team_color : '#F9F9F9'});
        }
      });
    } catch (error) {
      throw new Error(
        error.response
          ? `${error.response.data.code}, ${error.response.data.message}`
          : "나라 목록 조회 실패"
      );
    }
  };

  /** Effect */
  useEffect(() => {
    selectTeamList(false);
    selectCountryList();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div id="team-info">
        <Row className="team-info-search-row">
          <Col span={24} className="team-info-search-col">
            <Search
              placeholder="Input search text"
              onSearch={onSearch}
            />
          </Col>
        </Row>
        {_.map(teamList, (item, index) => {
          return (
            <Row
              key={index}
              className={
                selectedTeam.team_no === item.team_no
                ? "team-info-row selected"
                : "team-info-row"
              }
              onClick={(event) => onSelectedTeam(event, item, index)}
            >
              <Col span={4} className="team-info-col-1">
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
              <Col span={6} className="team-info-col-3">
                <span style={{fontSize: '16px', color: '#454545', paddingLeft: '10px'}}>[{item.team_total}개]</span>
              </Col>
              <Col span={10} className="team-info-col-4">
                <span style={{fontSize: '16px', color: '#9E9FA5'}}>{item.team_current}</span>
              </Col>
            </Row>
          )
        })}
      </div>
      <div id="map-info">
        <div id="map-control">
          <FullscreenOutlined onClick={initZoom} />
          <SettingOutlined onClick={handleTeamDeleteModalOpen} />
        </div>
        <MapContainer
          ref={mapRef}
          center={[51.505, -0.09]}
          zoom={2}
          minZoom={2}
          style={{ height: '100%', background: '#FFF' }}
          zoomControl={false}
        >
          <GeoJSON
            ref={geoJsonRef}
            data={countries.features}
            onEachFeature={onEachFeature}
          />
        </MapContainer >
      </div>
      <div id="teamDeleteModal">
        <TeamDeleteModal
          visible={teamDeleteModalVisible}
          onCancel={handleTeamDeleteModalClose}
          setIsLoading={setIsLoading}
          selectedTeam={selectedTeam}
          onDelete={onDelete}
        />
      </div>
    </>
  );
};

export default Map;