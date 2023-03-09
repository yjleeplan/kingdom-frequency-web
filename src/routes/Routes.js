import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop";
import WelcomeLayout from "../components/layouts/WelcomeLayout/WelcomeLayout";
import MainLayout from "../components/layouts/MainLayout/MainLayout";
import Welcome from "../components/pages/Welcome/Welcome";
import Main from "../components/pages/Main/Main";

const Routes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
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
          path="/"
          render={(props) => (
            <WelcomeLayout>
              <Welcome {...props} />
            </WelcomeLayout>
          )}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
