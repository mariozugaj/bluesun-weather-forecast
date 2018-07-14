import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "Header";
import HomePage from "HomePage";
import ForecastDailyPage from "ForecastDailyPage";
import ForecastHourlyPage from "ForecastHourlyPage";
import ForecastMapPage from "ForecastMapPage";
import NotFoundPage from "NotFoundPage";

const routes = (
  <React.Fragment>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/forecast/daily/:coordinates" component={ForecastDailyPage} />
      <Route path="/forecast/hourly/:coordinates" component={ForecastHourlyPage} />
      <Route path="/forecast/map/:coordinates" component={ForecastMapPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </React.Fragment>
);

export default routes;
