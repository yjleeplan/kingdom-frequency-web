import React, { useEffect, useState } from "react";
import { message  } from "antd";
import _ from "lodash";
import * as api from "../../../api";
import CategoryMzGeneration from "./CategoryMzGeneration";
import CategorySpirit from "./CategorySpirit";
import CategoryYoungAdult from "./CategoryYoungAdult";
import CategoryClimate from "./CategoryClimate";

const Category = ({ history, setIsLoading, missionCode = "" }) => {
  /** State */
  const [missionList, setMissionList] = useState([]);

  /** Effect */
  useEffect(() => {
    handleGetMissionList();
    //handleGetUserMissionHistory();
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
          user_id: "",
          mission_code: missionCode
        }
      });
      setMissionList(data);
      
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
      { missionCode === "MZ_GENERATION" && <CategoryMzGeneration missionList={missionList} /> }
      { missionCode === "SPIRIT"        && <CategorySpirit missionList={missionList} /> }
      { missionCode === "YOUNG_ADULT"   && <CategoryYoungAdult missionList={missionList} /> }
      { missionCode === "CLIMATE"       && <CategoryClimate missionList={missionList} /> }
    </>
  );
};

export default Category;
