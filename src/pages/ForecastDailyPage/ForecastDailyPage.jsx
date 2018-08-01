import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

import { getLocation } from "modules/locations";
import { fetchForecastIfNeeded } from "modules/forecast";
import CurrentConditions from "components/CurrentConditions";
import DailyConditions from "components/DailyConditions";
import LoadingModal from "components/LoadingModal";

export class ForecastDailyPage extends Component {
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
    const { currentLocation, getLocation, fetchForecastIfNeeded, location, isLoading } = this.props;

    if (prevProps.location.pathname !== location.pathname) {
      getLocation();
    }

    if (!currentLocation && !isLoading) {
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
            <h2>{`There has been an error in fetching forecast: ${forecastError.toString()}`}</h2>
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
      <React.Fragment>
        <Helmet>
          <title>{`BlueSun Weather Forecast | ${currentLocation.label}`}</title>
        </Helmet>
        <section>
          <CurrentConditions forecast={forecast} />
          <DailyConditions forecast={forecast} />
        </section>
      </React.Fragment>
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
  )(ForecastDailyPage)
);
