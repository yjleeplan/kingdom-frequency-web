export const ATTENDANCE_START_HOUR = 4;
export const ATTENDANCE_END_HOUR = 8;

export const IS_COMPLETE = (index, attendanceYn) => {
  switch (index) {
    case 0:
      return attendanceYn === "Y" ? "COMPLETE1" : false;
    case 1:
      return attendanceYn === "Y" ? "COMPLETE2" : false;
    case 2:
      return attendanceYn === "Y" ? "COMPLETE3" : false;
    case 3:
      return attendanceYn === "Y" ? "COMPLETE4" : false;
    case 4:
      return attendanceYn === "Y" ? "COMPLETE5" : false;

    default:
      return false;
  }
};

export const IS_NOT_COMPLETE = (index, today) => {
  switch (index) {
    case 0:
      return today === 17 ? "DAY1" : "SOON1";
    case 1:
      return today === 18 ? "DAY2" : "SOON2";
    case 2:
      return today === 19 ? "DAY3" : "SOON3";
    case 3:
      return today === 20 ? "DAY4" : "SOON4";
    case 4:
      return today === 21 ? "DAY5" : "SOON5";

    default:
      return false;
  }
};
