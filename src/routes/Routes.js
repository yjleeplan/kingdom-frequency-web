import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { message } from "antd";
import * as api from "../api";
import ScrollToTop from "../components/common/ScrollToTop";
import WelcomeLayout from "../components/layouts/WelcomeLayout/WelcomeLayout";
import MainLayout from "../components/layouts/MainLayout/MainLayout";
import CategoryLayout from "../components/layouts/CategoryLayout/CategoryLayout";
import MyPageLayout from "../components/layouts/MyPageLayout/MyPageLayout";
import RankDetailLayout from "../components/layouts/RankDetailLayout/RankDetailLayout";
import RankGameLayout from "../components/layouts/RankGameLayout/RankGameLayout";
import RankLayout from "../components/layouts/RankLayout/RankLayout";
import ChildhoodLayout from "../components/layouts/ChildhoodLayout/ChildhoodLayout";
import MapLayout from "../components/layouts/MapLayout/MapLayout";
import MapStatusLayout from "../components/layouts/MapStatusLayout/MapStatusLayout";
import PagePC from "../components/common/PagePC";
import Page404 from "../components/common/Page404";
import Welcome from "../components/pages/Welcome/Welcome";
import Main from "../components/pages/Main/Main";
import Category from "../components/pages/Category/Category";
import MyPage from "../components/pages/MyPage/MyPage";
import RankGame1 from "../components/pages/Rank/RankGame1";
import RankGame2 from "../components/pages/Rank/RankGame2";
import RankGame3 from "../components/pages/Rank/RankGame3";
import RankGame4 from "../components/pages/Rank/RankGame4";
import RankGame5 from "../components/pages/Rank/RankGame5";
import RankGame6 from "../components/pages/Rank/RankGame6";
import RankDetail from "../components/pages/Rank/RankDetail";
import Rank from "../components/pages/Rank/Rank";
import Childhood from "../components/pages/Childhood/Childhood";
import Map from "../components/pages/Map/Map";
import MapStatus from "../components/pages/MapStatus/MapStatus";
import { userInfoAction } from '../stores/actions';

const Routes = () => {
  /** State */
  const [cookies, setCookie, removeCookie] = useCookies(['kingdomFrequency']);
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useSelector(state => state.userInfo);
  const dispatch = useDispatch();

  let timer;

  /** Effect */
  useEffect(() => {
    authCheck();
    // eslint-disable-next-line
  }, []);

  // 인증 정보 체크
  const authCheck = () => {
    if ( cookies.kingdomFrequency ) {
      login(cookies.kingdomFrequency.id);
    }
    else {
      if ( window.location.pathname === "/mypage" ) {
        window.location.href = "/main";
      }
    }
  };

  // 로그인
  const login = async (id) => {
    try {
      timer = setTimeout(() => {
        setIsLoading(true);
      }, 800);

      const { data: user } = await api.selectUser({
        path: { user_id: id },
      });
      dispatch(userInfoAction.setUserInfo(user));

      const expireDate = new Date();
      expireDate.setMonth(expireDate.getMonth + 12);

      // 쿠키 저장
      setCookie(
        'kingdomFrequency',
        {
          id: id
        },
        {
          path: '/',
          expires: expireDate,
        }
      );
    } catch (error) {
      message.error(
        error.response
          ? `${error.response.data.code}, ${error.response.data.message}`
          : "로그인 실패"
      );
    } finally {
      clearTimeout(timer);
      setIsLoading(false);
    }
  };

  // 로그아웃
  const logout = () => {
    // 쿠키 삭제
    removeCookie('kingdomFrequency');
    dispatch(userInfoAction.setUserInfo({}));
    window.location.reload();
  };

  // 접속 기기 체크
  const isMobile = () => {
    const pc = 'win16|win32|win64|mac|macintel';
    if (navigator.platform) {
      if (pc.indexOf(navigator.platform.toLowerCase()) < 0) return true;
      else return false;
    }
    else return true;
  };

  // PC로 접속 시 예외처리
  const isPcException = () => {
    if (window.location.pathname === "/rank") {
      return true;
    }
    if (window.location.pathname === "/rank/1") {
      return true;
    }
    if (window.location.pathname === "/rank/2") {
      return true;
    }
    if (window.location.pathname === "/rank/3") {
      return true;
    }
    if (window.location.pathname === "/rank/4") {
      return true;
    }
    if (window.location.pathname === "/rank/5") {
      return true;
    }
    if (window.location.pathname === "/rank/6") {
      return true;
    }
    else if (window.location.pathname === "/childhood") {
      return true;
    }
    else if (window.location.pathname === "/childhood2") {
      return true;
    }
    else if (window.location.pathname === "/map") {
      return true;
    }
    else {
      return false;
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <Switch>
        {isMobile() ? (
          <>
            <Route
              exact
              path="/main"
              render={(props) => (
                <MainLayout isLoading={isLoading}>
                  <Main {...props} setIsLoading={setIsLoading} userData={userInfo} login={login} logout={logout} />
                </MainLayout>
              )}
            />
            <Route
              exact
              path="/category/mzGeneration"
              render={(props) => (
                <CategoryLayout isLoading={isLoading} type="mzGeneration">
                  <Category {...props} setIsLoading={setIsLoading} missionCode="MZ_GENERATION" userData={userInfo} />
                </CategoryLayout>
              )}
            />
            <Route
              exact
              path="/category/spirit"
              render={(props) => (
                <CategoryLayout isLoading={isLoading} type="spirit">
                  <Category {...props} setIsLoading={setIsLoading} missionCode="SPIRIT" userData={userInfo} />
                </CategoryLayout>
              )}
            />
            <Route
              exact
              path="/category/youngAdult"
              render={(props) => (
                <CategoryLayout isLoading={isLoading} type="youngAdult">
                  <Category {...props} setIsLoading={setIsLoading} missionCode="YOUNG_ADULT" userData={userInfo} />
                </CategoryLayout>
              )}
            />
            <Route
              exact
              path="/category/climate"
              render={(props) => (
                <CategoryLayout isLoading={isLoading} type="climate">
                  <Category {...props} setIsLoading={setIsLoading} missionCode="CLIMATE" userData={userInfo} />
                </CategoryLayout>
              )}
            />
            <Route
              exact
              path="/mypage"
              render={(props) => (
                <MyPageLayout isLoading={isLoading}>
                  <MyPage {...props} setIsLoading={setIsLoading} userData={userInfo} />
                </MyPageLayout>
              )}
            />
            <Route
              exact
              path="/rank/game1"
              render={(props) => (
                <RankGameLayout isLoading={isLoading} type={1}>
                  <RankGame1 {...props} setIsLoading={setIsLoading} />
                </RankGameLayout>
              )}
            />
            <Route
              exact
              path="/rank/game2"
              render={(props) => (
                <RankGameLayout isLoading={isLoading} type={2}>
                  <RankGame2 {...props} setIsLoading={setIsLoading} />
                </RankGameLayout>
              )}
            />
            <Route
              exact
              path="/rank/game3"
              render={(props) => (
                <RankGameLayout isLoading={isLoading} type={3}>
                  <RankGame3 {...props} setIsLoading={setIsLoading} />
                </RankGameLayout>
              )}
            />
            <Route
              exact
              path="/rank/game4"
              render={(props) => (
                <RankGameLayout isLoading={isLoading} type={4}>
                  <RankGame4 {...props} setIsLoading={setIsLoading} />
                </RankGameLayout>
              )}
            />
            <Route
              exact
              path="/rank/game5"
              render={(props) => (
                <RankGameLayout isLoading={isLoading} type={5}>
                  <RankGame5 {...props} setIsLoading={setIsLoading} />
                </RankGameLayout>
              )}
            />
            <Route
              exact
              path="/rank/game6"
              render={(props) => (
                <RankGameLayout isLoading={isLoading} type={6}>
                  <RankGame6 {...props} setIsLoading={setIsLoading} />
                </RankGameLayout>
              )}
            />
            <Route
              exact
              path="/map/status"
              render={(props) => (
                <MapStatusLayout isLoading={isLoading}>
                  <MapStatus {...props} setIsLoading={setIsLoading} />
                </MapStatusLayout>
              )}
            />
            <Route
              exact
              path="/"
              render={(props) => (
                <WelcomeLayout isLoading={isLoading}>
                  <Welcome {...props} />
                </WelcomeLayout>
              )}
            />
          </>
        ) : (
          isPcException() ? (
            <>
              <Route
                exact
                path="/rank"
                render={(props) => (
                  <RankLayout isLoading={isLoading}>
                    <Rank {...props} setIsLoading={setIsLoading} />
                  </RankLayout>
                )}
              />
              <Route
                exact
                path="/rank/1"
                render={(props) => (
                  <RankDetailLayout isLoading={isLoading} type={1} title="높이 더 높이">
                    <RankDetail {...props} setIsLoading={setIsLoading} type={1} />
                  </RankDetailLayout>
                )}
              />
              <Route
                exact
                path="/rank/2"
                render={(props) => (
                  <RankDetailLayout isLoading={isLoading} type={2} title="복음투수">
                    <RankDetail {...props} setIsLoading={setIsLoading} type={2} />
                  </RankDetailLayout>
                )}
              />
              <Route
                exact
                path="/rank/3"
                render={(props) => (
                  <RankDetailLayout isLoading={isLoading} type={3} title="사랑이 POP! 풍선이 POP!">
                    <RankDetail {...props} setIsLoading={setIsLoading} type={3} />
                  </RankDetailLayout>
                )}
              />
              <Route
                exact
                path="/rank/4"
                render={(props) => (
                  <RankDetailLayout isLoading={isLoading} type={4} title="적그리스도를 저격">
                    <RankDetail {...props} setIsLoading={setIsLoading} type={4} />
                  </RankDetailLayout>
                )}
              />
              <Route
                exact
                path="/rank/5"
                render={(props) => (
                  <RankDetailLayout isLoading={isLoading} type={5} title="나는야 사람을 낚는 어부">
                    <RankDetail {...props} setIsLoading={setIsLoading} type={5} />
                  </RankDetailLayout>
                )}
              />
              <Route
                exact
                path="/rank/6"
                render={(props) => (
                  <RankDetailLayout isLoading={isLoading} type={6} title="내가 품은 선교지를 향해서">
                    <RankDetail {...props} setIsLoading={setIsLoading} type={6} />
                  </RankDetailLayout>
                )}
              />
              <Route
                exact
                path="/childhood"
                render={(props) => (
                  <ChildhoodLayout isLoading={isLoading}>
                    <Childhood {...props} setIsLoading={setIsLoading} />
                  </ChildhoodLayout>
                )}
              />
              <Route
                exact
                path="/map"
                render={(props) => (
                  <MapLayout isLoading={isLoading}>
                    <Map {...props} setIsLoading={setIsLoading} />
                  </MapLayout>
                )}
              />
            </>
          ) : (
            <Route
              render={(props) => (
                <PagePC {...props} />
              )}
            />
          )
        )}
      </Switch>
    </Router>
  );
};

export default Routes;
