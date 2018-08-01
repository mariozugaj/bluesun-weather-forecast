import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "pages/HomePage";
import ForecastDailyPage from "pages/ForecastDailyPage";
import ForecastHourlyPage from "pages/ForecastHourlyPage";
import ForecastMapPage from "pages/ForecastMapPage";
import NotFoundPage from "pages/NotFoundPage";

const Routes = ({ location }) => (
  <Switch location={location}>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/forecast/daily/:coordinates" component={ForecastDailyPage} />
    <Route exact path="/forecast/hourly/:coordinates" component={ForecastHourlyPage} />
    <Route exact path="/forecast/map/:coordinates" component={ForecastMapPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;
