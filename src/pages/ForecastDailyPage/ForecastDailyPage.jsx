import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

import { setLocationFromParams } from "modules/currentLocation";
import { fetchForecastIfNeeded } from "modules/forecast";
import { extractCoordinates } from "helpers";
import CurrentConditions from "components/CurrentConditions";
import DailyConditions from "components/DailyConditions";
import LoadingModal from "components/LoadingModal";

export class ForecastDailyPage extends Component {
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
    const { forecast, isLoading, currentLocation } = this.props;

    if (isLoading) {
      return <LoadingModal text="Fetching forecast..." />;
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>{`BlueSun Forecast | ${currentLocation.label}`}</title>
        </Helmet>
        <CurrentConditions forecast={forecast} />
        <DailyConditions forecast={forecast} />
      </React.Fragment>
    );
  }
}

const mapState = (state, ownProps) => {
  const { locationString } = extractCoordinates(ownProps.match.params.coordinates);
  const forecast = state.forecast.byLocation[locationString] || {};

  return {
    forecast,
    isLoading: Object.keys(forecast).length === 0 || state.forecast.isFetching,
    currentLocation: state.currentLocation,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  const { locationLatLng, locationString } = extractCoordinates(ownProps.match.params.coordinates);

  return {
    setLocationFromParams: () => {
      return dispatch(setLocationFromParams(locationLatLng));
    },
    fetchForecastIfNeeded: () => dispatch(fetchForecastIfNeeded(locationString)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(ForecastDailyPage)
);
