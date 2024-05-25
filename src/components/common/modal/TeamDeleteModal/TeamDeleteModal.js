import React, { useState, useEffect } from "react";
import { Modal, Button, Col, Row, message, Image } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import _ from "lodash";
import * as api from "../../../../api";
import FlagImage from "../../FlagImage";

const TeamDeleteModal = ({ visible, onCancel, setIsLoading, selectedTeam, onDelete }) => {
  /** State */
  const [resultList, setResultList] = useState([]);

  // 닫기
  const handleCancel = () => {
    onCancel();
  };

  // 삭제
  const handleDelete = (countryName) => {
    Modal.confirm({
      className: "confirm-team-delete",
      icon: false,
      content:"삭제하시겠습니까?",
      cancelText: "취소",
      okText: "삭제",
      okType: 'danger',
      onOk: async () => {
        try {
          await api.deleteCountry({
            query: {
              team_no: selectedTeam.team_no,
              country_name: countryName
            },
          });

          selectTeamCountryList();
          onDelete();

          message.success("정상적으로 삭제되었습니다.");
        } catch (error) {
          throw new Error(
            error.response
              ? `${error.response.data.code}, ${error.response.data.message}`
              : "삭제 실패"
          );
        }
      },
    });
  };

  // 팀별 나라 목록 조회
  const selectTeamCountryList = async () => {
    try {
      const { data } = await api.listCountry({
        query: {
          team_no: selectedTeam.team_no
        },
      });

      setResultList(data);
    } catch (error) {
      throw new Error(
        error.response
          ? `${error.response.data.code}, ${error.response.data.message}`
          : "팀별 나라 목록 조회 실패"
      );
    }
  };

  /** Effect */
  useEffect(() => {
    visible && selectTeamCountryList();
    // eslint-disable-next-line
  }, [visible]);

  return (
    <Modal
      wrapClassName="team-delete-modal-wrap"
      title={`${selectedTeam.team_no}조`}
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="close" onClick={handleCancel}>
          닫기
        </Button>
      ]}
      maskClosable={false}
      getContainer={document.getElementById("teamDeleteModal")}
      destroyOnClose
    >
      {resultList?.length > 0
      ? _.map(resultList, (item, index) => {
        return (
          <Row key={index} className="team-delete-row">
            <Col span={20} className="team-delete-col-1">
              <FlagImage
                size={32}
                name={item.country_name}
              />
              {item.country_name}
            </Col>
            <Col span={4} className="">
              <Button onClick={() => handleDelete(item.country_name)}>
                <DeleteOutlined />
              </Button>
            </Col>
          </Row>
        )
      })
      : (
        <Row className="team-delete-row-nodata">
          <Col span={24}>
            아직 복음화된 나라가 없습니다.
          </Col>
        </Row>
      )}
    </Modal>
  );
};

export default TeamDeleteModal;
