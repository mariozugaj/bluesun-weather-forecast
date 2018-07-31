import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

import { getLocation } from "modules/locations";
import { fetchForecastIfNeeded } from "modules/forecast";
import LoadingModal from "components/LoadingModal";
import HourlyGraphs from "components/HourlyGraphs";

export class ForecastHourlyPage extends Component {
  static propTypes = {
    currentLocation: PropTypes.shape({
      coordinates: PropTypes.string,
      label: PropTypes.string,
      visitedAt: PropTypes.number,
    }),
    isLoading: PropTypes.bool.isRequired,
    forecast: PropTypes.object,
    locationError: PropTypes.object,
    forecastError: PropTypes.object,
    fetchForecastIfNeeded: PropTypes.func.isRequired,
    getLocation: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { currentLocation, getLocation, fetchForecastIfNeeded } = this.props;
    getLocation();
    if (currentLocation) {
      fetchForecastIfNeeded(currentLocation.coordinates);
    }
  }

  componentDidUpdate(prevProps) {
    const { currentLocation, getLocation, fetchForecastIfNeeded, location } = this.props;
    if (prevProps.location.pathname !== location.pathname) {
      getLocation();
    }
    if (currentLocation) {
      fetchForecastIfNeeded(currentLocation.coordinates);
    }
  }

  render() {
    const { locationError, isLoading, currentLocation, forecast, forecastError } = this.props;

    if (locationError || forecastError) {
      return (
        <div className="center-page-text-wrapper">
          {locationError && (
            <h2>{`There has been an error in determining desired location: ${
              locationError.message
            }`}</h2>
          )}
          {forecastError && (
            <h2>{`There has been an error in fetching forecast: ${forecastError.message}`}</h2>
          )}
        </div>
      );
    }

    if (isLoading || !currentLocation) {
      return (
        <LoadingModal text="Loading location parameters..." className="center-page-text-wrapper" />
      );
    }

    if (!forecast) {
      return <LoadingModal text="Fetching forecast..." className="center-page-text-wrapper" />;
    }

    return (
      <section className="layout-container--pad-top layout-container--scrollable">
        <Helmet>
          <title>{`BlueSun Weather Forecast | ${currentLocation.label}`}</title>
        </Helmet>
        <HourlyGraphs forecast={forecast.hourly} />
      </section>
    );
  }
}

const mapState = (state, ownProps) => {
  const { coordinates } = ownProps.match.params;
  return {
    currentLocation: state.locations.visited[coordinates],
    locationError: state.locations.error,
    isLoading: state.locations.isLoading,
    forecast: state.forecast.byLocation[coordinates],
    forecastError: state.forecast.error,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  const { coordinates } = ownProps.match.params;
  return {
    getLocation: () => dispatch(getLocation(coordinates)),
    fetchForecastIfNeeded: location => dispatch(fetchForecastIfNeeded(location)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(ForecastHourlyPage)
);
