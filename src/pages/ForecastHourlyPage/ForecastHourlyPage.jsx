import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { setLocationFromParams } from "modules/currentLocation";
import { fetchForecastIfNeeded } from "modules/forecast";
import { extractCoordinates } from "helpers";
import LoadingModal from "components/LoadingModal";
import HourlyGraphs from "components/HourlyGraphs";

export class ForecastHourlyPage extends Component {
  componentDidMount() {
    this.setLocationAndForecast();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setLocationAndForecast();
    }
  }

  setLocationAndForecast = () => {
    this.props.fetchForecastIfNeeded();
    this.props.setLocationFromParams();
  };

  render() {
    const { forecast, isFetching } = this.props;
    const forecastLoaded = Object.keys(forecast).length !== 0 && !isFetching;

    if (forecastLoaded) {
      return (
        <section className="layout-container--pad-top">
          <HourlyGraphs forecast={forecast.hourly} />
        </section>
      );
    } else {
      return <LoadingModal text="Fetching forecast..." />;
    }
  }
}

const mapState = (state, ownProps) => {
  return {
    forecast: state.forecast.byLocation[ownProps.match.params.coordinates] || {},
    isFetching: state.forecast.isFetching,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  const coordinates = extractCoordinates(ownProps.match.params.coordinates);
  return {
    setLocationFromParams: () => {
      return dispatch(setLocationFromParams(coordinates));
    },
    fetchForecastIfNeeded: () => dispatch(fetchForecastIfNeeded(ownProps.match.params.coordinates)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(ForecastHourlyPage)
);
