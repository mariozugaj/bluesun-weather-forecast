import React from "react";

const LocationInfo = props => {
  return (
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
