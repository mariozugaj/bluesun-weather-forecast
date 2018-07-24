import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DarkskyMap from "react-darksky-map";
import { Helmet } from "react-helmet";

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
    const { lat, lng, label } = this.props.currentLocation;
    return (
      <section className="map-wrapper">
        <Helmet>
          <title>{`BlueSun Forecast | ${label}`}</title>
        </Helmet>
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
  const { locationLatLng } = extractCoordinates(ownProps.match.params.coordinates);
  return {
    setLocationFromParams: () => {
      return dispatch(setLocationFromParams(locationLatLng));
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
