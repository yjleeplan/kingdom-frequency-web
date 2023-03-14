import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop";
import WelcomeLayout from "../components/layouts/WelcomeLayout/WelcomeLayout";
import MainLayout from "../components/layouts/MainLayout/MainLayout";
import CategoryLayout from "../components/layouts/CategoryLayout/CategoryLayout";
import PagePC from "../components/common/PagePC";
import Page404 from "../components/common/Page404";
import Welcome from "../components/pages/Welcome/Welcome";
import Main from "../components/pages/Main/Main";
import CategoryMzGeneration from "../components/pages/Category/CategoryMzGeneration";
import CategorySpirit from "../components/pages/Category/CategorySpirit";
import CategoryYoungAdult from "../components/pages/Category/CategoryYoungAdult";
import CategoryClimate from "../components/pages/Category/CategoryClimate";

const Routes = () => {
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
                <MainLayout>
                  <Main {...props} />
                </MainLayout>
              )}
            />
            <Route
              exact
              path="/category/mzGeneration"
              render={(props) => (
                <CategoryLayout layoutClass="mzGeneration">
                  <CategoryMzGeneration {...props} />
                </CategoryLayout>
              )}
            />
            <Route
              exact
              path="/category/spirit"
              render={(props) => (
                <CategoryLayout layoutClass="spirit">
                  <CategorySpirit {...props} />
                </CategoryLayout>
              )}
            />
            <Route
              exact
              path="/category/youngAdult"
              render={(props) => (
                <CategoryLayout layoutClass="youngAdult">
                  <CategoryYoungAdult {...props} />
                </CategoryLayout>
              )}
            />
            <Route
              exact
              path="/category/climate"
              render={(props) => (
                <CategoryLayout layoutClass="climate">
                  <CategoryClimate {...props} />
                </CategoryLayout>
              )}
            />
            <Route
              exact
              path="/"
              render={(props) => (
                <WelcomeLayout>
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
