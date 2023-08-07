import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Button, Col, Row, Card } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import _ from "lodash";
import * as api from "../../../../api";

const sampleData = [
  { country_name: '대한민국' },
  { country_name: '동티모르' },
  { country_name: '남아프리카 공화국' },
  { country_name: '사우디아라비아' },
  { country_name: '인도네시아' },
];

const TeamDeleteModal = ({ visible, onCancel, setIsLoading, selectedTeam }) => {
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
          // 
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
  };

  /** Effect */
  useEffect(() => {
    setResultList(sampleData);
    // eslint-disable-next-line
  }, []);

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
      {_.map(resultList, (item, index) => {
        return (
          <Row key={index} className="team-delete-row">
            <Col span={20} className="">
              {item.country_name}
            </Col>
            <Col span={4} className="">
              <Button onClick={() => handleDelete(item.country_name)}>
                <DeleteOutlined />
              </Button>
            </Col>
          </Row>
        )
      })}
    </Modal>
  );
};

export default TeamDeleteModal;
