import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../containers/Header";
import HomePage from "../pages/HomePage";
import ForecastDailyPage from "../pages/ForecastDailyPage";
import ForecastHourlyPage from "../pages/ForecastHourlyPage";
import ForecastMapPage from "../pages/ForecastMapPage";
import NotFound from "../components/NotFound";

const routes = (
  <React.Fragment>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/forecast/daily/:coordinates" component={ForecastDailyPage} />
      <Route path="/forecast/hourly/:coordinates" component={ForecastHourlyPage} />
      <Route path="/forecast/map/:coordinates" component={ForecastMapPage} />
      <Route component={NotFound} />
    </Switch>
  </React.Fragment>
);

export default routes;
