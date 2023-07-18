import _ from "lodash";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { MapContainer , GeoJSON, Marker, Popup } from "react-leaflet";
import countries from "./data/countries.json";
import "leaflet/dist/leaflet.css";
import { Col, Row, Image } from "antd";

const color = [
  '#30A2FF',
  '#FFE7A0',
  '#0D1282',
  '#6528F7',
  '#8C3333',
  '#557A46',
  '#5C2E7E',
  '#D71313',
  '#FFCACC',
  '#D4E2D4',
  '#A1CCD1',
  '#F31559',
  '#7D7463',
  '#CCEEBC',
  '#F1C93B',
  '#F86F03',
  '#FCE9F1',
  '#FF0060',
  '#FFD4B2',
  '#F0FF42',
  '#9E7676',
  '#C7F2A4',
];

const Map = ({ setIsLoading }) => {
  const [geoJsonData, setGeoJsonData] = useState(countries.features);
  const [selectedColor, setSelectedColor] = useState(color[0]);
  const selectedColorRef = useRef(selectedColor);

  const selectedTeam = (value) => {
    selectedColorRef.current = value;
  }

  const selectedCountry = (event) => {
    event.target.setStyle({
      color: '#000',
      fillColor: selectedColorRef.current,
    });
  };

  const onEachFeature = (feature, layer) => {
    layer.bindPopup(feature.properties.NAME);
    layer.on({
      click: selectedCountry,
      //mouseover: selectedCountry,
    });
  };

  return (
    <>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={2}
        style={{ height: '86%' }}
      >
        <GeoJSON
          style={{
            fillColor: '#FFF',
            fillOpacity: 1,
            color: '#000',
            weight: 2,
            dashArray: 1,
          }}
          data={geoJsonData}
          onEachFeature={onEachFeature}
        />
      </MapContainer >
      <Row
        className="team-info"
        style={{ height: '14%' }}
      >
        <Col span={24}>
          <Row style={{ height: '50%' }}>
            {_.map(color, (value, index) => {
              if (index < 12) {
                return (
                  <Col span={2} className="team-info-col" onClick={() => selectedTeam(value)}>
                    <input
                      className="team-color-input"
                      type="color"
                      value={value}
                      disabled
                    />
                    <span>{index + 1}조</span>
                  </Col>
                )
              }
            })}
          </Row>
          <Row style={{ height: '50%' }}>
            {_.map(color, (value, index) => {
              if (11 < index) {
                return (
                  <Col span={2} className="team-info-col" onClick={() => selectedTeam(value)}>
                    <input
                      className="team-color-input"
                      type="color"
                      value={value}
                      disabled
                    />
                    <span>{index + 1}조</span>
                  </Col>
                )
              }
            })}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Map;