import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import RecentLocations from "components/RecentLocations";
import FavoriteLocations from "components/FavoriteLocations";
import PoweredBy from "components/PoweredBy";

import { clearLocation, deleteVisitedLocation } from "modules/locations";
import { fetchForecastIfNeeded, deleteForecastForLocation } from "modules/forecast";
import { addFavoriteLocation, deleteFavoriteLocation } from "modules/favoriteLocations";
import { deleteRecentLocation } from "modules/recentLocations";
import { getFavoriteLocations, getRecentLocations } from "selectors";

const EmptyHomeStatus = () => (
  <div className="center-page-text-wrapper">
    <h2>As it turns out, you haven't yet visited any locations.</h2>
  </div>
);

export class HomePage extends Component {
  static propTypes = {
    recentLocations: PropTypes.arrayOf(
      PropTypes.shape({
        coordinates: PropTypes.string,
        label: PropTypes.string,
        visitedAt: PropTypes.number,
      })
    ),
    recentListing: PropTypes.arrayOf(PropTypes.string),
    favoriteLocations: PropTypes.arrayOf(
      PropTypes.shape({
        coordinates: PropTypes.string,
        label: PropTypes.string,
        visitedAt: PropTypes.number,
      })
    ),
    favoriteListing: PropTypes.arrayOf(PropTypes.string),
    forecast: PropTypes.shape({
      isFetching: PropTypes.bool,
      error: PropTypes.object,
      byLocation: PropTypes.objectOf(PropTypes.object),
    }),
    visited: PropTypes.objectOf(PropTypes.object),
    clearLocation: PropTypes.func.isRequired,
    fetchForecastIfNeeded: PropTypes.func.isRequired,
    deleteRecentLocation: PropTypes.func.isRequired,
    addFavoriteLocation: PropTypes.func.isRequired,
    deleteFavoriteLocation: PropTypes.func.isRequired,
    deleteVisitedLocation: PropTypes.func.isRequired,
    deleteForecastForLocation: PropTypes.func.isRequired,
    units: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  };

  componentDidMount() {
    const { clearLocation, recentLocations, favoriteLocations, fetchForecastIfNeeded } = this.props;

    clearLocation();
    recentLocations.forEach(location => {
      fetchForecastIfNeeded(location.coordinates);
    });
    favoriteLocations.forEach(location => {
      fetchForecastIfNeeded(location.coordinates);
    });
    this.tidyUp();
  }

  componentDidUpdate() {
    const { recentLocations, favoriteLocations, fetchForecastIfNeeded } = this.props;

    recentLocations.forEach(location => {
      fetchForecastIfNeeded(location.coordinates);
    });
    favoriteLocations.forEach(location => {
      fetchForecastIfNeeded(location.coordinates);
    });
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
      <React.Fragment>
        <main className="layout-container">
          <Helmet>
            <title>BlueSun Weather Forecast</title>
          </Helmet>
          {anyFavorite && <FavoriteLocations {...this.props} />}
          {anyRecent && <RecentLocations {...this.props} />}
          {!anyRecent && !anyFavorite && <EmptyHomeStatus />}
        </main>
        <PoweredBy />
      </React.Fragment>
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
    units: state.units.entities[state.units.currentUnits],
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
