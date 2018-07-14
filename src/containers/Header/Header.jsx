import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Icon from "Icon";
import LocationInfo from "LocationInfo";
import Search from "Search";
import CurrentPosition from "CurrentPosition";
import { setLocation, getCurrentPosition, startSearching, stopSearching } from "currentLocation";

export class Header extends Component {
  componentDidMount() {}

  render() {
    return (
      <header className="layout-container">
        <section className="page-header">
          <Link to="/" className="page-header__icon page-header__icon--onTop">
            <Icon
              name="logo"
              className="page-header__icon--img page-header__logo"
              title="Go to homepage"
              alt="BlueSun Weather Forecast"
            />
          </Link>
          <LocationInfo
            location={this.props.currentLocation}
            startSearching={this.props.startSearching}
          />
          <CurrentPosition {...this.props} />
          <Search {...this.props} />
        </section>
      </header>
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
