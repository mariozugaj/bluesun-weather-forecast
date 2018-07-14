import React from "react";

import Icon from "Icon";
import LoadingModal from "LoadingModal";

const CurrentPosition = ({ getCurrentPosition, currentLocation }) => {
  return (
    <React.Fragment>
      {currentLocation.isLocating && <LoadingModal text="We are trying to locate you..." />}
      <span className="page-header__icon">
        <Icon
          name="arrow"
          title="Get forecast for current position"
          size="25px"
          onClick={() => getCurrentPosition()}
        />
      </span>
    </React.Fragment>
  );
};

export default CurrentPosition;
