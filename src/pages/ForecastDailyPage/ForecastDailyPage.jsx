import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { setLocationFromParams } from "modules/currentLocation";
import { fetchForecastIfNeeded } from "modules/forecast";
import { extractCoordinates, coordinatesToString } from "helpers";
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
    const { forecast, isFetching } = this.props;
    const forecastLoaded = Object.keys(forecast).length !== 0 && !isFetching;

    if (forecastLoaded) {
      return (
        <React.Fragment>
          <CurrentConditions forecast={forecast} />
          <DailyConditions forecast={forecast} />
        </React.Fragment>
      );
    } else {
      return <LoadingModal text="Fetching forecast..." />;
    }
  }
}

const mapState = (state, ownProps) => {
  const latLng = extractCoordinates(ownProps.match.params.coordinates);
  const coordinates = coordinatesToString(latLng);

  return {
    forecast: state.forecast.byLocation[coordinates] || {},
    isFetching: state.forecast.isFetching,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  const latLng = extractCoordinates(ownProps.match.params.coordinates);
  const coordinates = coordinatesToString(latLng);

  return {
    setLocationFromParams: () => {
      return dispatch(setLocationFromParams(latLng));
    },
    fetchForecastIfNeeded: () => dispatch(fetchForecastIfNeeded(coordinates)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(ForecastDailyPage)
);
