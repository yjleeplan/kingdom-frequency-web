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
  const [isDisabled, setIsDisabled] = useState(false);
  const [checkedSeq, setCheckedSeq] = useState(null);
  const [count, setCount] = useState(0);

  /** Effect */
  useEffect(() => {
    handleGetMissionList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    !_.isEmpty(userData) && handleGetUserMissionHistory();
    !_.isEmpty(userData) && handleGetMissionCount();
    // eslint-disable-next-line
  }, [userData]);

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

      if ( !_.isEmpty(data) ) {
        setCheckedSeq(data.seq);
        setIsDisabled(true);
      }
      else {
        setIsDisabled(false);
      }
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

  // 사용자 실천항목 갯수 조회
  const handleGetMissionCount = async () => {
    try {
      setIsLoading(true);
      
      const { data } = await api.selectMissionHistoryCount({
        query: {
          user_id: userData.id,
          mission_code: missionCode
        },
      });

      setCount(_.head(data).checked_count);
    } catch (error) {
      message.error(
        error.response
          ? `${error.response.data.code}, ${error.response.data.message}`
          : "사용자 실천항목 갯수 조회 실패"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      { missionCode === "MZ_GENERATION" &&
        <CategoryMzGeneration
          missionCode={missionCode}
          missionList={missionList}
          count={count}
          isDisabled={isDisabled}
          checkedSeq={checkedSeq}
        />
      }
      { missionCode === "SPIRIT" &&
        <CategorySpirit
          missionCode={missionCode}
          missionList={missionList}
          count={count}
          isDisabled={isDisabled}
          checkedSeq={checkedSeq}
        />
      }
      { missionCode === "YOUNG_ADULT" &&
        <CategoryYoungAdult
          missionCode={missionCode}
          missionList={missionList}
          count={count}
          isDisabled={isDisabled}
          checkedSeq={checkedSeq}
        />
      }
      { missionCode === "CLIMATE" &&
        <CategoryClimate
          missionCode={missionCode}
          missionList={missionList}
          count={count}
          isDisabled={isDisabled}
          checkedSeq={checkedSeq}
        />
      }
    </>
  );
};

export default Category;
