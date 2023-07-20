import { Form, Input, message, Modal, Row, Col, Button, Select } from "antd";
import React from "react";
import * as api from "../../../api";

// Select Options
const options = [
  { label: "1조", value: "1조" },
  { label: "2조", value: "2조" },
  { label: "3조", value: "3조" },
  { label: "4조", value: "4조" },
  { label: "5조", value: "5조" },
  { label: "6조", value: "6조" },
  { label: "7조", value: "7조" },
  { label: "8조", value: "8조" },
];

const RankGame4 = ({ setIsLoading }) => {
  // Form Init
  const initialValues = {
    name: null,
    point: "",
  };

  let timer;

  /** Hook */
  const [form] = Form.useForm();

  // 등록
  const handleSave = () => {
    form.submit();
  };

  // 초기화
  const handleClear =() => {
    form.resetFields();
  };

  // Form Submit
  const onFinish = (values) => {
    const params = {
      type: "1",
      name: values.name,
      point: Number(values.point),
    };

    Modal.confirm({
      title: "등록 확인",
      content: "등록하시겠습니까?",
      okText: "확인",
      cancelText: "취소",
      onOk: async () => {
        try {
          timer = setTimeout(() => {
            setIsLoading(true);
          }, 800);
          await api.createRankStack({
            data: params,
          });

          message.success("정상적으로 등록되었습니다");
          handleClear();
        } catch (error) {
          message.error(
            error.response
              ? `${error.response.data.code}, ${error.response.data.message}`
              : "등록 실패"
          );
        } finally {
          clearTimeout(timer);
          setIsLoading(false);
        }
      },
    });
  };
  
  return (
    <>
      <Row className="rank-game-head">
        <Col span={24}>나는 믿음의 사람!</Col>
      </Row>
      <Row className="rank-game-body">
        <Col span={24}>
          <Form
            form={form}
            name="form"
            initialValues={initialValues}
            onFinish={onFinish}
            labelCol={{ span: 4 }}
          >
            <Form.Item label="조 선택" required className="form-item-wrap">
              <Form.Item
                className="form-item-inner-wrap"
                name="name"
                rules={[
                {
                    required: true,
                    message: "조를 입력해주세요",
                },
                ]}
              >
                <Select
                  placeholder="조를 선택해주세요"
                  options={options}
                  size="large"
                />
              </Form.Item>
            </Form.Item>
            <Form.Item label="점수" required className="form-item-wrap">
              <Form.Item
                name="point"
                rules={[
                {
                    required: true,
                    message: "점수를 입력해주세요",
                },
                ]}
              >
                <Input placeholder="점수를 입력해주세요" size="large" inputmode="numeric" pattern="[0-9]*"/>
              </Form.Item>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row className="rank-game-foot">
        <Col span={24}>
          <Button
            size="large"
            type="primary"
            className="rank-game-button"
            onClick={handleSave}
          >
            등 록
          </Button>
        </Col>
      </Row>
    </>
  );
};
  
export default RankGame4;