import _ from "lodash";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { MapContainer , GeoJSON, Marker, Popup, useMapEvents } from "react-leaflet";
import countries from "./data/countries.json";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Col, Row, Input, Modal, message } from "antd";
import { FullscreenOutlined, SwapRightOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import TeamDeleteModal from "../../common/modal/TeamDeleteModal/TeamDeleteModal";

const { Search } = Input;

const sampleMapData = [
  { team_no: 1, team_total: 4, team_color: '#F86F03', team_current: '대한민국' },
  { team_no: 2, team_total: 5, team_color: '#FFC6AC', team_current: '동티모르' },
  { team_no: 3, team_total: 15, team_color: '#FFDEB4', team_current: '라오스' },
  { team_no: 4, team_total: 10, team_color: '#FFF89A', team_current: '레바논' },
  { team_no: 5, team_total: 2, team_color: '#FFD966', team_current: '말레이시아' },
  { team_no: 6, team_total: 2, team_color: '#CBFFA9', team_current: '중국' },
  { team_no: 7, team_total: 8, team_color: '#C8E4B2', team_current: '북한' },
  { team_no: 8, team_total: 8, team_color: '#9ED2BE', team_current: '일본' },
  { team_no: 9, team_total: 9, team_color: '#7EAA92', team_current: '인도네시아' },
  { team_no: 10, team_total: 9, team_color: '#B9F3E4', team_current: '인도' },
  { team_no: 11, team_total: 12, team_color: '#9ADCFF', team_current: '이스라엘' },
  { team_no: 12, team_total: 11, team_color: '#95BDFF', team_current: '이란' },
  { team_no: 13, team_total: 11, team_color: '#8EA7E9', team_current: '카자흐스탄' },
  { team_no: 14, team_total: 7, team_color: '#7286D3', team_current: '카타르' },
  { team_no: 15, team_total: 4, team_color: '#E5E0FF', team_current: '남아프리카 공화국' },
  { team_no: 16, team_total: 4, team_color: '#B2A4FF', team_current: '캄보디아' },
  { team_no: 17, team_total: 10, team_color: '#FFAACF', team_current: '쿠웨이트' },
  { team_no: 18, team_total: 10, team_color: '#FF8AAE', team_current: '사우디아라비아' },
  { team_no: 19, team_total: 6, team_color: '#EA8FEA', team_current: '태국' },
  { team_no: 20, team_total: 8, team_color: '#C4C1A4', team_current: '타이완' },
  { team_no: 21, team_total: 6, team_color: '#9E9FA5', team_current: '몽골' },
  { team_no: 22, team_total: 4, team_color: '#0D1282', team_current: '프랑스' },
];

const selectedTeamFormat = {
  team_no: 0,
  team_total: 0,
  team_color: '',
  team_current: ''
};

const Map = ({ setIsLoading }) => {
  /** State */
  const [teamList, setTeamList] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(selectedTeamFormat);
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

  // 검색
  const onSearch = (value) => {
    const layers = geoJsonRef.current.getLayers();
    const searchedLayer = _.chain(layers)
                           .filter(function(o) { return value === o.feature.properties.NAME })
                           .head()
                           .value()
    ;

    // 검색 결과가 존재하는 경우
    if (searchedLayer) {
      console.log(searchedLayer.getCenter());

      // 좌표로 이동
      mapRef.current.flyTo(searchedLayer.getCenter(), 4);

      setTeamList(_.map(teamList, (item, index) => {
        if (item.team_no === selectedTeam.team_no) {
          item.team_current = value;
        }
        return item;
      }));

      // Confirm 창 오픈
      Modal.confirm({
        className: "confirm-search-result",
        icon: false,
        title: `${selectedTeam.team_no}조`,
        content:
          <>
            <SwapRightOutlined /> {value}
          </>
        ,
        okText: "복음화",
        cancelText: "취소",
        onOk: async () => {
          try {
            // 색상 적용
            searchedLayer.setStyle({ fillColor: selectedTeam.team_color });
          } catch (error) {
            message.error(
              error.response
                ? `${error.response.data.code}, ${error.response.data.message}`
                : "등록 실패"
            );
          } finally {
            // 
          }
        },
      });
    } else {
      message.error("검색 결과가 없습니다.");
    }
  };

  /** Effect */
  useEffect(() => {
    setTeamList(sampleMapData);
    setSelectedTeam(sampleMapData[0]);
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
        />
      </div>
    </>
  );
};

export default Map;