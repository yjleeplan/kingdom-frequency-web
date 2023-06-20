import { Image } from "antd";
import React from "react";
import board0100 from "../../assets/images/board/board_01_00.png";
import board0101 from "../../assets/images/board/board_01_01.png";
import board0102 from "../../assets/images/board/board_01_02.png";
import board0103 from "../../assets/images/board/board_01_03.png";
import board0104 from "../../assets/images/board/board_01_04.png";
import board0105 from "../../assets/images/board/board_01_05.png";
import board0106 from "../../assets/images/board/board_01_06.png";
import board0107 from "../../assets/images/board/board_01_07.png";
import board0108 from "../../assets/images/board/board_01_08.png";
import board0109 from "../../assets/images/board/board_01_09.png";
import board0110 from "../../assets/images/board/board_01_10.png";
import board0200 from "../../assets/images/board/board_02_00.png";
import board0201 from "../../assets/images/board/board_02_01.png";
import board0202 from "../../assets/images/board/board_02_02.png";
import board0203 from "../../assets/images/board/board_02_03.png";
import board0204 from "../../assets/images/board/board_02_04.png";
import board0205 from "../../assets/images/board/board_02_05.png";
import board0206 from "../../assets/images/board/board_02_06.png";
import board0207 from "../../assets/images/board/board_02_07.png";
import board0208 from "../../assets/images/board/board_02_08.png";
import board0209 from "../../assets/images/board/board_02_09.png";
import board0210 from "../../assets/images/board/board_02_10.png";
import board0211 from "../../assets/images/board/board_02_11.png";
import board0212 from "../../assets/images/board/board_02_12.png";
import board0213 from "../../assets/images/board/board_02_13.png";
import board0214 from "../../assets/images/board/board_02_14.png";
import board0215 from "../../assets/images/board/board_02_15.png";
import board0300 from "../../assets/images/board/board_03_00.png";
import board0301 from "../../assets/images/board/board_03_01.png";
import board0302 from "../../assets/images/board/board_03_02.png";
import board0303 from "../../assets/images/board/board_03_03.png";
import board0304 from "../../assets/images/board/board_03_04.png";
import board0305 from "../../assets/images/board/board_03_05.png";
import board0400 from "../../assets/images/board/board_04_00.png";
import board0401 from "../../assets/images/board/board_04_01.png";
import board0402 from "../../assets/images/board/board_04_02.png";
import board0403 from "../../assets/images/board/board_04_03.png";
import board0404 from "../../assets/images/board/board_04_04.png";
import board0405 from "../../assets/images/board/board_04_05.png";
import board0406 from "../../assets/images/board/board_04_06.png";
import board0407 from "../../assets/images/board/board_04_07.png";
import board0408 from "../../assets/images/board/board_04_08.png";
import board0409 from "../../assets/images/board/board_04_09.png";
import board0410 from "../../assets/images/board/board_04_10.png";

const Board = ({ missionCode, count = 0 }) => {
  const getSrc = () => {
    let src = null;
    
    if ( missionCode === "MZ_GENERATION" && count === 0 ) { src = board0100; }
    else if ( missionCode === "MZ_GENERATION" && count === 1 ) { src = board0101; }
    else if ( missionCode === "MZ_GENERATION" && count === 2 ) { src = board0102; }
    else if ( missionCode === "MZ_GENERATION" && count === 3 ) { src = board0103; }
    else if ( missionCode === "MZ_GENERATION" && count === 4 ) { src = board0104; }
    else if ( missionCode === "MZ_GENERATION" && count === 5 ) { src = board0105; }
    else if ( missionCode === "MZ_GENERATION" && count === 6 ) { src = board0106; }
    else if ( missionCode === "MZ_GENERATION" && count === 7 ) { src = board0107; }
    else if ( missionCode === "MZ_GENERATION" && count === 8 ) { src = board0108; }
    else if ( missionCode === "MZ_GENERATION" && count === 9 ) { src = board0109; }
    else if ( missionCode === "MZ_GENERATION" && count >= 10 ) { src = board0110; }
    else if ( missionCode === "SPIRIT" && count === 0 ) { src = board0200; }
    else if ( missionCode === "SPIRIT" && count === 1 ) { src = board0201; }
    else if ( missionCode === "SPIRIT" && count === 2 ) { src = board0202; }
    else if ( missionCode === "SPIRIT" && count === 3 ) { src = board0203; }
    else if ( missionCode === "SPIRIT" && count === 4 ) { src = board0204; }
    else if ( missionCode === "SPIRIT" && count === 5 ) { src = board0205; }
    else if ( missionCode === "SPIRIT" && count === 6 ) { src = board0206; }
    else if ( missionCode === "SPIRIT" && count === 7 ) { src = board0207; }
    else if ( missionCode === "SPIRIT" && count === 8 ) { src = board0208; }
    else if ( missionCode === "SPIRIT" && count === 9 ) { src = board0209; }
    else if ( missionCode === "SPIRIT" && count === 10 ) { src = board0210; }
    else if ( missionCode === "SPIRIT" && count === 11 ) { src = board0211; }
    else if ( missionCode === "SPIRIT" && count === 12 ) { src = board0212; }
    else if ( missionCode === "SPIRIT" && count === 13 ) { src = board0213; }
    else if ( missionCode === "SPIRIT" && count === 14 ) { src = board0214; }
    else if ( missionCode === "SPIRIT" && count >= 15 ) { src = board0215; }
    else if ( missionCode === "YOUNG_ADULT" && count === 0 ) { src = board0300; }
    else if ( missionCode === "YOUNG_ADULT" && count === 1 ) { src = board0301; }
    else if ( missionCode === "YOUNG_ADULT" && count === 2 ) { src = board0302; }
    else if ( missionCode === "YOUNG_ADULT" && count === 3 ) { src = board0303; }
    else if ( missionCode === "YOUNG_ADULT" && count === 4 ) { src = board0304; }
    else if ( missionCode === "YOUNG_ADULT" && count >= 5 ) { src = board0305; }
    else if ( missionCode === "CLIMATE" && count === 0 ) { src = board0400; }
    else if ( missionCode === "CLIMATE" && count === 1 ) { src = board0401; }
    else if ( missionCode === "CLIMATE" && count === 2 ) { src = board0402; }
    else if ( missionCode === "CLIMATE" && count === 3 ) { src = board0403; }
    else if ( missionCode === "CLIMATE" && count === 4 ) { src = board0404; }
    else if ( missionCode === "CLIMATE" && count === 5 ) { src = board0405; }
    else if ( missionCode === "CLIMATE" && count === 6 ) { src = board0406; }
    else if ( missionCode === "CLIMATE" && count === 7 ) { src = board0407; }
    else if ( missionCode === "CLIMATE" && count === 8 ) { src = board0408; }
    else if ( missionCode === "CLIMATE" && count === 9 ) { src = board0409; }
    else if ( missionCode === "CLIMATE" && count >= 10 ) { src = board0410; }
     
    return src;
  };

  return (
    <Image
      width={"100%"}
      height={"100%"}
      src={getSrc()}
      preview={false}
    />
  );
};

export default Board;
