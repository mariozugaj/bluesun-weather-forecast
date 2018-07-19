import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DarkskyMap from "react-darksky-map";

import { setLocationFromParams } from "modules/currentLocation";
import { extractCoordinates } from "helpers";

export class ForecastMapPage extends Component {
  componentDidMount() {
    this.props.setLocationFromParams();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.setLocationFromParams();
    }
  }

  render() {
    const { lat, lng } = this.props.currentLocation;
    return (
      <section className="map-wrapper">
        <DarkskyMap lat={lat} lng={lng} zoom={7} height="100%" />
      </section>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    currentLocation: state.currentLocation,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  const coordinates = extractCoordinates(ownProps.match.params.coordinates);
  return {
    setLocationFromParams: () => {
      return dispatch(setLocationFromParams(coordinates));
    },
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(ForecastMapPage)
);
