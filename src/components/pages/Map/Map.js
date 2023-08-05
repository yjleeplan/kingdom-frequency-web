import _ from "lodash";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { MapContainer , GeoJSON, Marker, Popup, useMapEvents } from "react-leaflet";
import countries from "./data/countries.json";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Col, Row, Image, Input, Modal, message } from "antd";
import { FullscreenExitOutlined, UndoOutlined } from '@ant-design/icons';
import FlagIcon from "../../../assets/images/icon_flag.png";

const { Search } = Input;

const sample = [
  '4',
  '5',
  '15',
  '10',
  '2',
  '2',
  '8',
  '8',
  '9',
  '9',
  '12',
  '11',
  '11',
  '7',
  '4',
  '4',
  '10',
  '10',
  '6',
  '4',
  '6',
  '8',
];

const sampleCurrent = [
  '대한민국',
  '동티모르',
  '라오스',
  '레바논',
  '말레이시아',
  '중국',
  '북한',
  '일본',
  '인도네시아',
  '인도',
  '이스라엘',
  '이란',
  '카자흐스탄',
  '카타르',
  '남아프리카 공화국',
  '캄보디아',
  '쿠웨이트',
  '사우디아라비아',
  '태국',
  '타이완',
  '몽골',
  '프랑스',
];

const colors = [
'#F86F03',
'#FFC6AC',
'#FFDEB4',
'#FFF89A',
'#FFD966',
'#CBFFA9',
'#C8E4B2',
'#9ED2BE',
'#7EAA92',
'#B9F3E4',
'#9ADCFF',
'#95BDFF',
'#8EA7E9',
'#7286D3',
'#E5E0FF',
'#B2A4FF',
'#FFAACF',
'#FF8AAE',
'#EA8FEA',
'#C4C1A4',
'#9E9FA5',
'#0D1282',
];

const markers = [
  {
    geocode: [51.505, -0.09],
    popUp: "Hello world",
  },
  {
    geocode: [21.500, 10.09],
    popUp: "Hello world",
  },
  {
    geocode: [60.000, 100.00],
    popUp: "Hello world",
  },
];

const markerIcon = new Icon({
  iconUrl: FlagIcon,
  iconSize: [60, 60],
});

const Map = ({ setIsLoading }) => {
  const [geoJsonData, setGeoJsonData] = useState(countries.features);
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(0);
  const [selectedTeamCurrent, setSelectedTeamCurrent] = useState(sampleCurrent);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const selectedColorRef = useRef(selectedColor);
  const mapRef = useRef(null);
  const geoJsonRef = useRef(null);

  const initZoom = () => {
    mapRef.current.flyTo([51.505, -0.09], 2);
  }

  const onSelectedTeam = (event, value, index) => {
    const teamInfoCol = document.getElementsByClassName('team-info-row');

    _.map(teamInfoCol, (value, i) => {
      if (i === index) {
        teamInfoCol[i].classList.add("selected");
      } else {
        teamInfoCol[i].classList.remove("selected");
      }
    });

    selectedColorRef.current = value;
    setSelectedTeamIndex(index);
  };

  const onSelectedCountry = (event) => {
    console.log(event.target);

    event.target.setStyle({
      color: '#000',
      fillColor: selectedColorRef.current,
    });
  };

  const onEachFeature = (feature, layer) => {
    layer.bindPopup(feature.properties.NAME);
    // layer.on({
    //   click: selectedCountry,
    //   //mouseover: selectedCountry,
    // });
  };

  const onSearch = (value) => {
    const layers = geoJsonRef.current.getLayers();
    const searchedLayer = _.chain(layers)
                           .filter(function(o) { return value === o.feature.properties.NAME })
                           .head()
                           .value()
    ;

    if (searchedLayer) {
      // 좌표로 이동
      mapRef.current.flyTo(searchedLayer.getCenter(), 4);

      const newCurrent = [...selectedTeamCurrent];
      newCurrent[Number(selectedTeamIndex)] = value;

      setSelectedTeamCurrent(newCurrent);

      Modal.confirm({
        title: `${selectedTeamIndex + 1}조`,
        content: `-> ${value}`,
        okText: "복음화",
        cancelText: "취소",
        onOk: async () => {
          try {
            // 색상 적용
            searchedLayer.setStyle({
              color: '#000',
              fillColor: selectedColorRef.current,
            });
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

      console.log(searchedLayer.getCenter());
    } else {
      message.error("검색 결과가 없습니다.");
    }
  };

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
        {_.map(colors, (value, index) => {
          return (
            <Row
              key={index}
              className="team-info-row"
              onClick={(event) => onSelectedTeam(event, value, index)}
            >
              <Col span={4} className="team-info-col-1">
                <input
                  className="team-color-input"
                  type="color"
                  value={value}
                  disabled
                />
              </Col>
              <Col span={4} className="team-info-col-2">
                <span>{index + 1}조</span>
              </Col>
              <Col span={6} className="team-info-col-3">
                <span style={{fontSize: '16px', color: '#454545', paddingLeft: '10px'}}>[{sample[index]}개]</span>
              </Col>
              <Col span={10} className="team-info-col-4">
                <span style={{fontSize: '16px', color: '#9E9FA5'}}>{selectedTeamCurrent[index]}</span>
              </Col>
            </Row>
          )
        })}
      </div>
      <div id="map-info">
        <div id="map-control">
          <FullscreenExitOutlined onClick={initZoom}/>
          <UndoOutlined />
        </div>
        <MapContainer
          ref={mapRef}
          center={[51.505, -0.09]}
          zoom={2}
          minZoom={2}
          style={{ height: '100%', background: '#EAEAEA' }}
          zoomControl={false}
        >
          <GeoJSON
            ref={geoJsonRef}
            style={{
              //fillColor: '#FFF',
              fillOpacity: 1,
              color: '#000',
              weight: 2,
              dashArray: 1,
            }}
            data={geoJsonData}
            onEachFeature={onEachFeature}
          />
          {/* {_.map(markers, (item, index) => {
            return (
              <Marker
                key={index}
                position={item.geocode}
                icon={markerIcon}
              />
            )
          })} */}
        </MapContainer >
      </div>
    </>
  );
};

export default Map;