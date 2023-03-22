import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { message } from "antd";
import * as api from "../api";
import ScrollToTop from "../components/common/ScrollToTop";
import WelcomeLayout from "../components/layouts/WelcomeLayout/WelcomeLayout";
import MainLayout from "../components/layouts/MainLayout/MainLayout";
import CategoryLayout from "../components/layouts/CategoryLayout/CategoryLayout";
import MyPageLayout from "../components/layouts/MyPageLayout/MyPageLayout";
import PagePC from "../components/common/PagePC";
import Page404 from "../components/common/Page404";
import Welcome from "../components/pages/Welcome/Welcome";
import Main from "../components/pages/Main/Main";
import Category from "../components/pages/Category/Category";
import MyPage from "../components/pages/MyPage/MyPage";

const Routes = () => {
  /** State */
  const [cookies, setCookie, removeCookie] = useCookies(['kingdomFrequency']);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
      setUserData(user);

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
    setUserData({});
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

  return (
    <Router>
      <ScrollToTop />
      <Switch>
          <>
            <Route
              exact
              path="/main"
              render={(props) => (
                <MainLayout isLoading={isLoading}>
                  <Main {...props} setIsLoading={setIsLoading} userData={userData} login={login} logout={logout} />
                </MainLayout>
              )}
            />
            <Route
              exact
              path="/category/mzGeneration"
              render={(props) => (
                <CategoryLayout isLoading={isLoading} type="mzGeneration">
                  <Category {...props} setIsLoading={setIsLoading} missionCode="MZ_GENERATION" userData={userData} />
                </CategoryLayout>
              )}
            />
            <Route
              exact
              path="/category/spirit"
              render={(props) => (
                <CategoryLayout isLoading={isLoading} type="spirit">
                  <Category {...props} setIsLoading={setIsLoading} missionCode="SPIRIT" userData={userData} />
                </CategoryLayout>
              )}
            />
            <Route
              exact
              path="/category/youngAdult"
              render={(props) => (
                <CategoryLayout isLoading={isLoading} type="youngAdult">
                  <Category {...props} setIsLoading={setIsLoading} missionCode="YOUNG_ADULT" userData={userData} />
                </CategoryLayout>
              )}
            />
            <Route
              exact
              path="/category/climate"
              render={(props) => (
                <CategoryLayout isLoading={isLoading} type="climate">
                  <Category {...props} setIsLoading={setIsLoading} missionCode="CLIMATE" userData={userData} />
                </CategoryLayout>
              )}
            />
            <Route
              exact
              path="/mypage"
              render={(props) => (
                <MyPageLayout isLoading={isLoading}>
                  <MyPage {...props} setIsLoading={setIsLoading} userData={userData} />
                </MyPageLayout>
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
      </Switch>
    </Router>
  );
};

export default Routes;
