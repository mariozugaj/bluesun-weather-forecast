import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Logo from "Logo";
import LocationInfo from "LocationInfo";
import Search from "Search";
import CurrentPosition from "CurrentPosition";
import { setLocation, getCurrentPosition, startSearching, stopSearching } from "currentLocation";

export class Header extends Component {
  render() {
    return (
      <section className="layout-container">
        <header className="page-header">
          <Logo />
          <LocationInfo {...this.props} />
          <CurrentPosition {...this.props} />
          <Search {...this.props} />
        </header>
      </section>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    currentLocation: state.currentLocation,
  };
};
const mapDispatch = {
  setLocation,
  getCurrentPosition,
  startSearching,
  stopSearching,
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Header)
);
