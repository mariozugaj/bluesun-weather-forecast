import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DarkskyMap from "react-darksky-map";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

import { trimCoordinates } from "helpers";
import { getLocation } from "modules/locations";
import { startLoadingMap, mapLoaded } from "modules/map";
import LoadingModal from "components/LoadingModal";

export class ForecastMapPage extends Component {
  static propTypes = {
    currentLocation: PropTypes.shape({
      coordinates: PropTypes.string,
      label: PropTypes.string,
      visitedAt: PropTypes.number,
    }),
    isLoading: PropTypes.bool.isRequired,
    isMapLoading: PropTypes.bool.isRequired,
    locationError: PropTypes.object,
    getLocation: PropTypes.func.isRequired,
    mapLoaded: PropTypes.func.isRequired,
    startLoadingMap: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getLocation();
    this.props.startLoadingMap();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.getLocation();
    }
  }

  render() {
    const { locationError, isLoading, currentLocation, isMapLoading, mapLoaded } = this.props;

    if (locationError) {
      return (
        <div className="center-page-text-wrapper">
          {locationError && (
            <h2>{`There has been an error in determining desired location: ${
              locationError.message
            }`}</h2>
          )}
        </div>
      );
    }

    if (isLoading || !currentLocation) {
      return (
        <LoadingModal text="Loading location parameters..." className="center-page-text-wrapper" />
      );
    }
    const coordinates = trimCoordinates(currentLocation.coordinates);
    return (
      <section className="map-wrapper">
        {isMapLoading && (
          <LoadingModal text="Loading map... " className="center-page-text-wrapper" />
        )}
        <Helmet>
          <title>{`BlueSun Weather Forecast | ${currentLocation.label}`}</title>
        </Helmet>
        <DarkskyMap
          lat={coordinates[0]}
          lng={coordinates[1]}
          zoom={8}
          height="100%"
          onLoad={() => mapLoaded()}
        />
      </section>
    );
  }
}

const mapState = (state, ownProps) => ({
  currentLocation: state.locations.visited[ownProps.match.params.coordinates],
  locationError: state.locations.error,
  isLoading: state.locations.isLoading,
  isMapLoading: state.map.isLoading,
});

const mapDispatch = (dispatch, ownProps) => {
  const { coordinates } = ownProps.match.params;
  return {
    getLocation: () => dispatch(getLocation(coordinates)),
    mapLoaded: () => dispatch(mapLoaded()),
    startLoadingMap: () => dispatch(startLoadingMap()),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(ForecastMapPage)
);
