import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { setLocationFromParams, clearLocation } from "modules/currentLocation";
import { fetchForecastIfNeeded } from "modules/forecast";
import { extractCoordinates } from "helpers";
import CurrentConditions from "components/CurrentConditions";

export class ForecastDailyPage extends Component {
  componentDidMount() {
    this.setLocationAndForecast();
  }

  componentDidUpdate(prevProps) {
    this.setLocationAndForecast();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.isFetching !== this.props.isFetching ||
      nextProps.location.pathname !== this.props.location.pathname
    );
  }

  setLocationAndForecast = () => {
    this.props.setLocationFromParams();
    this.props.fetchForecastIfNeeded();
  };

  render() {
    return <CurrentConditions forecast={this.props.forecast} isFetching={this.props.isFetching} />;
  }
}

const mapState = (state, ownProps) => {
  return {
    currentLocation: state.currentLocation,
    forecast: state.forecast.byLocation[ownProps.match.params.coordinates],
    isFetching: state.forecast.isFetching,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  const coordinates = extractCoordinates(ownProps.match.params.coordinates);
  return {
    setLocationFromParams: () => {
      return dispatch(setLocationFromParams(coordinates));
    },
    clearLocation: () => dispatch(clearLocation()),
    fetchForecastIfNeeded: () => dispatch(fetchForecastIfNeeded(ownProps.match.params.coordinates)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(ForecastDailyPage)
);
