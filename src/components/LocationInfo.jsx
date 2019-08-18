import React from "react";
import ContentLoader from "react-content-loader";
import PropTypes from "prop-types";

const LocationInfo = ({ currentLocation, locations, locationError }) => {
  if (locations.isLoading) {
    return (
      <div className="page-header__location-heading">
        <span className="page-header__loader-wrapper">
          <ContentLoader
            height={20}
            width={240}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="2" y="3.05" rx="3" ry="3" width="240" height="20" />
          </ContentLoader>
        </span>
      </div>
    );
  }

  if (!currentLocation || locationError) return null;

  return (
    <h1 className="page-header__location-heading">{currentLocation.label}</h1>
  );
};

LocationInfo.propTypes = {
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
  locationError: PropTypes.object,
};

export default LocationInfo;
