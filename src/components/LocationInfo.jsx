import React from "react";
import ContentLoader from "react-content-loader";

const LocationInfo = props => {
  if (props.currentLocation.isSettingLocation) {
    return (
      <div className="page-header__location-heading">
        <span className="page-header__loader-wrapper">
          <ContentLoader
            height={20}
            width={240}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb">
            <rect x="2" y="3.05" rx="3" ry="3" width="240" height="20" />
          </ContentLoader>
        </span>
      </div>
    );
  } else {
    return (
      <h1
        className="page-header__location-heading"
        onClick={props.startSearching}
        onKeyPress={props.startSearching}
        tabIndex="0">
        {props.currentLocation.label}
      </h1>
    );
  }
};

export default LocationInfo;
