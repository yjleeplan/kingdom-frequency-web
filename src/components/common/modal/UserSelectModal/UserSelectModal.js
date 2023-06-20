import { SearchOutlined } from "@ant-design/icons";
import { Form, Input, message, Modal, Button, Col, Row, Typography } from "antd";
import _ from "lodash";
import React, { useState } from "react";
import * as api from "../../../../api";

const { Text } = Typography;

const UserSelectModal = ({ visible, onCancel, setIsLoading, login }) => {
  // Form Init
  const initialValues = {
    keyword: "",
  };

  /** Hook */
  const [form] = Form.useForm();

  /** State */
  const [resultList, setResultList] = useState([]);

  let timer;

  // 검색
  const handleSearch = () => {
    form.submit();
  };

  // Form Submit
  const onFinish = async ({ keyword }) => {
    try {
      timer = setTimeout(() => {
        setIsLoading(true);
      }, 800);

      const { data: users } = await api.listUser({
        query: {
          ...(keyword && { name: keyword }),
        },
      });

      if (_.isEmpty(users)) {
        message.warning({
          content: "검색결과 없습니다. 등록 먼저 부탁드립니다.",
          duration: 1.2,
          style: {
            marginTop: "280px",
          },
        });
        setResultList([]);
      } else {
        clearTimeout(timer);
        setResultList(users);
      }
    } catch (error) {
      Modal.error({
        title: "검색 실패",
        content: error.response
          ? `${error.response.data.code}, ${error.response.data.message}`
          : error.message,
        okText: "확인",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 그리드 선택
  const handleClick = ( data ) => () => {
    Modal.confirm({
      content: <><Text className="user-name">{data.name}</Text>님으로 로그인하시겠습니까?</>,
      okText: "확인",
      cancelText: "취소",
      onOk: () => {
        login(data.id);
        onCancel();
      },
    });
  };

  // 닫기
  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      wrapClassName="user-select-modal-wrap"
      title="로그인 사용자 검색"
      open={visible}
      onCancel={handleCancel}
      footer={false}
      maskClosable={false}
      getContainer={document.getElementById("userSelectModal")}
      destroyOnClose
    >
      <Form
        form={form}
        name="form"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <div className="search-wrap">
          <Form.Item name="keyword">
            <Input
              placeholder="이름을 입력해주세요"
              suffix={<SearchOutlined onClick={handleSearch} />}
            />
          </Form.Item>
        </div>
        <div className={!_.isEmpty(resultList) ? "grid-wrap" : "grid-wrap no-data"}>
          {_.map(resultList, (item, index) => {
            const last = (index + 1) < resultList.length ? "" : "last";
            const even = (index + 1) % 2 !== 0 ? "" : "even";

            return (
              <Row key={index} className={`grid-data-row ${even} ${last}`}>
                <Col span={8} className="grid-data-col-1">
                  {item['name']}
                </Col>
                <Col span={10} className="grid-data-col-2">
                  {item['department']}
                </Col>
                <Col span={6}  className="grid-data-col-3">
                  <Button
                    size="small"
                    type="primary"
                    shape="round"
                    onClick={handleClick(item)}
                  >
                    선택
                  </Button>
                </Col>
              </Row>
            );
          })}
        </div>
      </Form>
    </Modal>
  );
};

export default UserSelectModal;
