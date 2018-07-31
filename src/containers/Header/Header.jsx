import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";

import Logo from "components/Logo";
import LocationInfo from "components/LocationInfo";
import Search from "components/Search";
import CurrentPosition from "components/CurrentPosition";
import HeaderNav from "./HeaderNav";
import Favorite from "components/Favorite";

import { startSearching, stopSearching } from "modules/search";
import { getCurrentPosition } from "modules/currentPosition";
import { addNewVisitedSuccess } from "modules/locations";
import { addFavoriteLocation, deleteFavoriteLocation } from "modules/favoriteLocations";
import { getCurrentLocation } from "redux/selectors";

export class Header extends Component {
  static propTypes = {
    currentLocation: PropTypes.shape({
      coordinates: PropTypes.string,
      label: PropTypes.string,
      visitedAt: PropTypes.number,
    }),
    locations: PropTypes.shape({
      currentLocation: PropTypes.string,
      error: PropTypes.object,
      isLoading: PropTypes.bool.isRequired,
      visited: PropTypes.objectOf(PropTypes.object),
    }),
    currentPosition: PropTypes.shape({
      error: PropTypes.object,
      isLocating: PropTypes.bool.isRequired,
    }),
    isSearching: PropTypes.bool.isRequired,
    locationError: PropTypes.object,
    favoriteLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
    getCurrentPosition: PropTypes.func.isRequired,
    startSearching: PropTypes.func.isRequired,
    stopSearching: PropTypes.func.isRequired,
    addNewVisitedSuccess: PropTypes.func.isRequired,
    addFavoriteLocation: PropTypes.func.isRequired,
    deleteFavoriteLocation: PropTypes.func.isRequired,
  };

  render() {
    const { currentLocation, locationError } = this.props;
    const isNotHome = currentLocation ? true : false;

    return (
      <section className="layout-container">
        <header className="page-header">
          <Logo />
          <LocationInfo {...this.props} />
          {isNotHome && <Favorite {...this.props} />}
          <CurrentPosition {...this.props} />
          {<Search {...this.props} />}
        </header>
        {isNotHome && !locationError && <HeaderNav coordinates={currentLocation.coordinates} />}
      </section>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    currentLocation: getCurrentLocation(state),
    locations: state.locations,
    currentPosition: state.currentPosition,
    isSearching: state.search.isSearching,
    locationError: state.locations.error,
    favoriteLocations: state.favoriteLocations,
  };
};
const mapDispatch = {
  getCurrentPosition,
  startSearching,
  stopSearching,
  addNewVisitedSuccess,
  addFavoriteLocation,
  deleteFavoriteLocation,
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Header)
);
