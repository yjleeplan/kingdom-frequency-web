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
        setCheckedMissionId(data.mission_id);
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
            setIsLoading(true);
            
            await api.createMissionHistory({
              data: {
                user_id: userData.id,
                mission_id: checkedMissionId
              },
            });

            Modal.success({
              title: "금주의 실천항목을 완료하셨습니다",
              content: "오늘도 수고하셨습니다 :)",
              onOk: () => window.location.reload()
            });
          } catch (error) {
            message.error(
              error.response
                ? `${error.response.data.code}, ${error.response.data.message}`
                : "사용자 실천 완료하기 처리 실패"
            );
          } finally {
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
