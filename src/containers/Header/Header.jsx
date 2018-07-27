import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Logo from "components/Logo";
import LocationInfo from "components/LocationInfo";
import Search from "components/Search";
import CurrentPosition from "components/CurrentPosition";
import { startSearching, stopSearching } from "modules/search";
import { getCurrentPosition } from "modules/currentPosition";
import HeaderNav from "./HeaderNav";
import { getCurrentLocation } from "redux/selectors";
import { addNewVisitedSuccess } from "modules/locations";

export class Header extends Component {
  render() {
    const { currentLocation, locationError } = this.props;
    const isNotHome = currentLocation ? true : false;

    return (
      <section className="layout-container">
        <header className="page-header">
          <Logo />
          <LocationInfo {...this.props} />
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
  };
};
const mapDispatch = {
  getCurrentPosition,
  startSearching,
  stopSearching,
  addNewVisitedSuccess,
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Header)
);
