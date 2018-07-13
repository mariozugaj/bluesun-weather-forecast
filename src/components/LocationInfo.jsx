import React from "react";
import ContentLoader from "react-content-loader";

const LocationInfo = props => {
  return props.location.isLocating ? (
    <span className="page-header__loader">
      <ContentLoader
        style={{ width: "20%", height: "1.5em" }}
        speed={2}
        preserveAspectRatio="none"
      />
    </span>
  ) : (
    <h1
      className="page-header__location-heading"
      onClick={props.startSearching}
      onKeyPress={props.startSearching}
      tabIndex="0">
      {props.location.label}
    </h1>
  );
};

export default LocationInfo;
