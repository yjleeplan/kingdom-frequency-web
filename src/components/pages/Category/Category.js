import React, { useEffect, useState } from "react";
import { message  } from "antd";
import _ from "lodash";
import * as api from "../../../api";
import CategoryMzGeneration from "./CategoryMzGeneration";
import CategorySpirit from "./CategorySpirit";
import CategoryYoungAdult from "./CategoryYoungAdult";
import CategoryClimate from "./CategoryClimate";

const Category = ({ history, setIsLoading, missionCode = "", userData }) => {
  /** State */
  const [missionList, setMissionList] = useState([]);

  /** Effect */
  useEffect(() => {
    handleGetMissionList();
    //!_.isEmpty(userData) && handleGetUserMissionHistory();
    // eslint-disable-next-line
  }, []);

  // 실천항목 목록 조회
  const handleGetMissionList = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.listMission({
        query: { mission_code: missionCode },
      });
      setMissionList(data);
      
    } catch (error) {
      message.error(
        error.response
          ? `${error.response.data.code}, ${error.response.data.message}`
          : "실천항목 목록 조회 실패"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 사용자 실천 이력 조회
  const handleGetUserMissionHistory = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.selectMissionHistory({
        query: {
          user_id: userData.id,
          mission_code: missionCode
        }
      });
      //setMissionList(data);
      
    } catch (error) {
      message.error(
        error.response
          ? `${error.response.data.code}, ${error.response.data.message}`
          : "사용자 실천 이력 조회 실패"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      { missionCode === "MZ_GENERATION" && <CategoryMzGeneration missionCode={missionCode} missionList={missionList} count={5} /> }
      { missionCode === "SPIRIT"        && <CategorySpirit missionCode={missionCode} missionList={missionList} count={10} /> }
      { missionCode === "YOUNG_ADULT"   && <CategoryYoungAdult missionCode={missionCode} missionList={missionList} count={4} /> }
      { missionCode === "CLIMATE"       && <CategoryClimate missionCode={missionCode} missionList={missionList} count={7} /> }
    </>
  );
};

export default Category;
