import React, { useEffect, useState } from "react";
import { message, Modal } from "antd";
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
  const [checkedMissionId, setCheckedMissionId] = useState("");
  const [count, setCount] = useState(0);

  let getMissionHistoryTimer;
  let createMissionHistoryTimer;

  /** Effect */
  useEffect(() => {
    handleGetMissionAndMissionHistory();
    // eslint-disable-next-line
  }, []);

  const handleGetMissionAndMissionHistory = async () => {
    try {
      getMissionHistoryTimer = setTimeout(() => {
        setIsLoading(true);
      }, 800);

      await handleGetMissionList();
      if (!_.isEmpty(userData)) {
        await handleGetUserMissionHistory();
        await handleGetMissionCount();
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      clearTimeout(getMissionHistoryTimer);
      setIsLoading(false);
    }
  };

  // 실천항목 목록 조회
  const handleGetMissionList = async () => {
    try {
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
    }
  };

  // 사용자 실천 이력 조회
  const handleGetUserMissionHistory = async () => {
    try {
      const { data } = await api.selectMissionHistoryWeek({
        path: {
          user_id: userData.id,
        },
        query: {
          mission_code: missionCode
        }
      });

      if ( !_.isEmpty(data) ) {
        setCheckedMissionId(data.mission_id);
        setIsDisabled(true);
      }
      else {
        setIsDisabled(false);
      }
    } catch (error) {
      throw new Error(
        error.response
          ? `${error.response.data.code}, ${error.response.data.message}`
          : "사용자 실천 이력 조회 실패"
      );
    }
  };

  // 사용자 실천항목 갯수 조회
  const handleGetMissionCount = async () => {
    try {
      const { data } = await api.selectMissionHistoryCount({
        query: {
          user_id: userData.id,
          mission_code: missionCode
        },
      });

      setCount(_.head(data).checked_count);
    } catch (error) {
      throw new Error(
        error.response
          ? `${error.response.data.code}, ${error.response.data.message}`
          : "사용자 실천항목 갯수 조회 실패"
      );
    }
  };

  // 사용자 실천 완료하기
  const handleMissionComplete = () => {
    if ( _.isEmpty(userData) ) {
      message.error("로그인이 필요합니다.");
    }
    else if ( _.isEmpty(checkedMissionId) ) {
      message.warning("실천항목을 선택해주세요.");
    }
    else {
      const content = _.head(_.filter(missionList, { 'id' : checkedMissionId })).desc;

      Modal.confirm({
        title: "금주 완료 실천항목",
        content: `- ${content}`,
        okText: "완료",
        cancelText: "취소",
        onOk: async () => {
          try {
            createMissionHistoryTimer = setTimeout(() => {
              setIsLoading(true);
            }, 800);
            
            await api.createMissionHistory({
              data: {
                user_id: userData.id,
                mission_id: checkedMissionId
              },
            });

            Modal.success({
              title: "금주의 실천항목을 완료하셨습니다",
              content: "오늘도 수고하셨습니다 :)",
              onOk: handleGetMissionAndMissionHistory
            });
          } catch (error) {
            message.error(
              error.response
                ? `${error.response.data.code}, ${error.response.data.message}`
                : "사용자 실천 완료하기 처리 실패"
            );
          } finally {
            clearTimeout(createMissionHistoryTimer);
            setIsLoading(false);
          }
        },
      });
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
          checkedMissionId={checkedMissionId}
          setCheckedMissionId={setCheckedMissionId}
          onClick={handleMissionComplete}
        />
      }
      { missionCode === "SPIRIT" &&
        <CategorySpirit
          missionCode={missionCode}
          missionList={missionList}
          count={count}
          isDisabled={isDisabled}
          checkedMissionId={checkedMissionId}
          setCheckedMissionId={setCheckedMissionId}
          onClick={handleMissionComplete}
        />
      }
      { missionCode === "YOUNG_ADULT" &&
        <CategoryYoungAdult
          missionCode={missionCode}
          missionList={missionList}
          count={count}
          isDisabled={isDisabled}
          checkedMissionId={checkedMissionId}
          setCheckedMissionId={setCheckedMissionId}
          onClick={handleMissionComplete}
        />
      }
      { missionCode === "CLIMATE" &&
        <CategoryClimate
          missionCode={missionCode}
          missionList={missionList}
          count={count}
          isDisabled={isDisabled}
          checkedMissionId={checkedMissionId}
          setCheckedMissionId={setCheckedMissionId}
          onClick={handleMissionComplete}
        />
      }
    </>
  );
};

export default Category;
