import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { clearLocation } from "modules/currentLocation";
import { fetchForecastIfNeeded } from "modules/forecast";
import VisitedLocations from "components/VisitedLocations";

const EmptyHomeStatus = () => (
  <div className="center-page-text-wrapper">
    <h2>As it turns out, you haven't yet visited any locations.</h2>
  </div>
);

export class HomePage extends Component {
  componentDidMount() {
    const { clearLocation, visitedLocations, fetchForecastIfNeeded } = this.props;

    clearLocation();
    visitedLocations.forEach(location => {
      return fetchForecastIfNeeded(location.id);
    });
  }

  render() {
    const { forecast, visitedLocations } = this.props;
    const anyVisited = visitedLocations.length !== 0;

    return (
      <main className="layout-container">
        {anyVisited ? (
          <VisitedLocations forecast={forecast} visitedLocations={visitedLocations} />
        ) : (
          <EmptyHomeStatus />
        )}
      </main>
    );
  }
}

HomePage.propTypes = {
  visitedLocations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      visitedAt: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      lat: PropTypes.number,
      lng: PropTypes.number,
    })
  ).isRequired,
  forecast: PropTypes.shape({
    isFething: PropTypes.bool.isRequired,
    byLocation: PropTypes.object.isRequired,
  }).isRequired,
};

const mostRecentFiveLocations = allLocations =>
  Object.values(allLocations)
    .slice(0, 5)
    .sort((a, b) => (a.visitedAt < b.visitedAt ? 1 : -1));

const mapState = state => {
  return {
    visitedLocations: mostRecentFiveLocations(state.visitedLocations),
    forecast: state.forecast,
  };
};

const mapDispatch = {
  clearLocation,
  fetchForecastIfNeeded,
};

export default connect(
  mapState,
  mapDispatch
)(HomePage);
