import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DarkskyMap from "react-darksky-map";

import { setLocationFromParams } from "modules/currentLocation";
import { extractCoordinates } from "helpers";
import { startLoadingMap, mapLoaded } from "modules/map";
import LoadingModal from "components/LoadingModal";

export class ForecastMapPage extends Component {
  componentDidMount() {
    this.props.setLocationFromParams();
    this.props.startLoadingMap();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.setLocationFromParams();
      this.props.startLoadingMap();
    }
  }

  render() {
    const { lat, lng } = this.props.currentLocation;
    return (
      <section className="map-wrapper">
        <DarkskyMap
          lat={lat}
          lng={lng}
          zoom={7}
          height="100%"
          onLoad={() => this.props.mapLoaded()}
        />
        {this.props.isMapLoading && <LoadingModal text="Loading map... " />}
      </section>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    currentLocation: state.currentLocation,
    isMapLoading: state.map.isLoading,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  const coordinates = extractCoordinates(ownProps.match.params.coordinates);
  return {
    setLocationFromParams: () => {
      return dispatch(setLocationFromParams(coordinates));
    },
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
