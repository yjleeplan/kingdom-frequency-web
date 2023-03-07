import { Image, message, Modal } from "antd";
import React from "react";
import * as api from "../../api";
import btn1 from "../../assets/images/btn_1.png";
import btn2 from "../../assets/images/btn_2.png";
import btn3 from "../../assets/images/btn_3.png";
import btn4 from "../../assets/images/btn_4.png";
import btn5 from "../../assets/images/btn_5.png";
import complete1 from "../../assets/images/btn_1_complete.png";
import complete2 from "../../assets/images/btn_2_complete.png";
import complete3 from "../../assets/images/btn_3_complete.png";
import complete4 from "../../assets/images/btn_4_complete.png";
import complete5 from "../../assets/images/btn_5_complete.png";
import { IS_COMPLETE } from "../../context/Context";

const AdminStamp = ({
  index,
  attendanceYn,
  attendanceId,
  onSelectUser,
  setIsLoading,
  today,
  hour,
}) => {
  // 금일자 컬럼 Formatter
  const indexFormatter = (index) => {
    return {
      0: "DAY1",
      1: "DAY2",
      2: "DAY3",
      3: "DAY4",
      4: "DAY5",
    }[index];
  };

  // 스탬프 Formatter
  const stampFormatter = (value) => {
    return {
      DAY1: btn1,
      DAY2: btn2,
      DAY3: btn3,
      DAY4: btn4,
      DAY5: btn5,
      COMPLETE1: complete1,
      COMPLETE2: complete2,
      COMPLETE3: complete3,
      COMPLETE4: complete4,
      COMPLETE5: complete5,
    }[value];
  };

  // 스탬프 타입
  const stampType = () => {
    let type = IS_COMPLETE(index, attendanceYn);
    if (!type) {
      type = indexFormatter(index);
    }

    return type;
  };

  // 스탬프 이미지 소스
  const stampSource = () => {
    const type = stampType();

    return stampFormatter(type);
  };

  // 출석
  const handleUpdatedAttendance = () => {
    Modal.confirm({
      title: `${index + 1}일차`,
      content:
        attendanceYn === "N"
          ? "출석 처리하시겠습니까?"
          : "결석 처리하시겠습니까?",
      okText: "확인",
      cancelText: "취소",
      onOk: async () => {
        try {
          setIsLoading(true);

          const value = attendanceYn === "N" ? "Y" : "N";

          await api.updatedAttendance({
            path: { attendance_id: attendanceId },
            data: { [`day${Number(index) + 1}`]: value },
          });

          onSelectUser();
        } catch (error) {
          message.error(
            error.response ? `${error.response.data.message}` : "출석 실패"
          );
        } finally {
          setIsLoading(false);
        }
      },
    });
  };

  return (
    <div>
      <Image
        wrapperClassName={attendanceYn !== "N" ? "btnEffect" : ""}
        src={stampSource()}
        preview={false}
        onClick={handleUpdatedAttendance}
      />
      {Number(index) + 1}일차
    </div>
  );
};

export default AdminStamp;
