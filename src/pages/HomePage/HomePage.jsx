import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import { clearLocation, deleteVisitedLocation } from "modules/locations";
import { fetchForecastIfNeeded, deleteForecastForLocation } from "modules/forecast";
import { addFavoriteLocation, deleteFavoriteLocation } from "modules/favoriteLocations";
import { deleteRecentLocation } from "modules/recentLocations";
import RecentLocations from "components/RecentLocations";
import FavoriteLocations from "components/FavoriteLocations";
import { getFavoriteLocations, getRecentLocations } from "selectors";

const EmptyHomeStatus = () => (
  <div className="center-page-text-wrapper">
    <h2>As it turns out, you haven't yet visited any locations.</h2>
  </div>
);

export class HomePage extends Component {
  componentDidMount() {
    const { clearLocation, recentLocations, favoriteLocations, fetchForecastIfNeeded } = this.props;

    clearLocation();
    recentLocations.forEach(location => {
      return fetchForecastIfNeeded(location.coordinates);
    });
    favoriteLocations.forEach(location => {
      return fetchForecastIfNeeded(location.coordinates);
    });
    this.tidyUp();
  }

  tidyUp = () => {
    const {
      visited,
      recentListing,
      favoriteListing,
      deleteVisitedLocation,
      deleteForecastForLocation,
    } = this.props;
    Object.keys(visited).forEach(location => {
      const isRedundant = !recentListing.includes(location) && !favoriteListing.includes(location);
      if (isRedundant) {
        deleteVisitedLocation(location);
        deleteForecastForLocation(location);
      }
    });
  };

  render() {
    const anyRecent = this.props.recentLocations.length !== 0;
    const anyFavorite = this.props.favoriteLocations.length !== 0;

    return (
      <main className="layout-container">
        <Helmet>
          <title>BlueSun Weather Forecast</title>
        </Helmet>
        {anyFavorite && <FavoriteLocations {...this.props} />}
        {anyRecent && <RecentLocations {...this.props} />}
        {!anyRecent && !anyFavorite && <EmptyHomeStatus />}
      </main>
    );
  }
}

const mapState = state => {
  return {
    recentLocations: getRecentLocations(state),
    favoriteLocations: getFavoriteLocations(state),
    forecast: state.forecast,
    visited: state.locations.visited,
    recentListing: state.recentLocations,
    favoriteListing: state.favoriteLocations,
  };
};

const mapDispatch = {
  clearLocation,
  fetchForecastIfNeeded,
  deleteRecentLocation,
  addFavoriteLocation,
  deleteFavoriteLocation,
  deleteVisitedLocation,
  deleteForecastForLocation,
};

export default connect(
  mapState,
  mapDispatch
)(HomePage);
