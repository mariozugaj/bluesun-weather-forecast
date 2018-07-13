import React, { Component } from "react";
import { connect } from "react-redux";

import "./HomePage.css";
import { clearLocation } from "../redux/modules/currentLocation";
import { fetchForecastIfNeeded } from "../redux/modules/forecasts";
import WeatherLocationList from "../components/WeatherLocationList";

export class HomePage extends Component {
  componentDidMount() {
    this.props.clearLocation();
    Object.keys(this.props.visitedLocations).forEach(location => {
      return this.props.fetchForecastIfNeeded(location);
    });
  }

  render() {
    const { forecasts, visitedLocations } = this.props;

    return (
      <main className="layout-container">
        <WeatherLocationList forecasts={forecasts} visitedLocations={visitedLocations} />
      </main>
    );
  }
}

const mapState = state => {
  return {
    visitedLocations: state.visitedLocations,
    forecasts: state.forecasts,
  };
};

const mapDispatch = {
  clearLocation,
  fetchForecastIfNeeded,
};

export default connect(
  mapState,
  mapDispatch
)(HomePage);
