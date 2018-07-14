import React from "react";

import Icon from "Icon";
import Loader from "Loader";

const CurrentPosition = props => {
  const handleClick = () => {
    props.getCurrentPosition();
  };

  const LocatingNotification = () => (
    <div className="center-page-text-wrapper center-page-text-wrapper--top">
      <h2>We are trying to locate you...</h2>
      <Loader />
    </div>
  );

  return (
    <React.Fragment>
      {props.currentLocation.isLocating && <LocatingNotification />}
      <span className="page-header__icon">
        <Icon
          name="arrow"
          title="Get forecast for current position"
          size="25px"
          onClick={handleClick}
        />
      </span>
    </React.Fragment>
  );
};

export default CurrentPosition;
