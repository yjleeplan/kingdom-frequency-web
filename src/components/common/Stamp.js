import { Image, message } from "antd";
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
import {
  ATTENDANCE_END_HOUR,
  ATTENDANCE_START_HOUR,
  IS_COMPLETE,
  IS_NOT_COMPLETE,
} from "../../context/Context";

const Stamp = ({
  index,
  attendanceYn,
  attendanceId,
  onSelectUser,
  setIsLoading,
  today,
  hour,
}) => {
  // 금일자 컬럼 Formatter
  const todayFormatter = (today) => {
    return {
      17: "day1",
      18: "day2",
      19: "day3",
      20: "day4",
      21: "day5",
    }[today];
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
      SOON1: btn1,
      SOON2: btn2,
      SOON3: btn3,
      SOON4: btn4,
      SOON5: btn5,
    }[value];
  };

  // 스탬프 타입
  const stampType = () => {
    let type = IS_COMPLETE(index, attendanceYn);
    if (!type) type = IS_NOT_COMPLETE(index, today);

    return type;
  };

  // 스탬프 이미지 소스
  const stampSource = () => {
    const type = stampType();

    return stampFormatter(type);
  };

  // 출석 체크 가능 여부
  const isUpdateEnable = () => {
    const type = stampType();
    let result = false;

    if (!["COMPLETE1", "COMPLETE2", "COMPLETE3", "COMPLETE4", "COMPLETE5"].includes(type)) {
      result = true;
    }

    return result;
  };

  // 출석
  const handleUpdatedAttendance = async () => {
    try {
      if (isUpdateEnable()) {
        if (todayFormatter(today) === `day${Number(index) + 1}`) {
          if (ATTENDANCE_START_HOUR <= hour && hour < ATTENDANCE_END_HOUR) {
            setIsLoading(true);

            await api.updatedAttendance({
              path: { attendance_id: attendanceId },
              data: { [`day${Number(index) + 1}`]: "Y" },
            });

            onSelectUser();
          } else {
            message.warning("출석은 04:00 ~ 08:00 사이에만 가능합니다.", 1.2);
          }
        } else {
          message.warning("금일 출석 가능 일자가 아닙니다.", 1.2);
        }
      }
    } catch (error) {
      message.error(
        error.response ? `${error.response.data.message}` : "출석 실패"
      );
    } finally {
      setIsLoading(false);
    }
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

export default Stamp;
