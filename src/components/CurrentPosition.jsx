import React from "react";

import Icon from "components/Icon";
import LoadingModal from "components/LoadingModal";

const CurrentPosition = ({ getCurrentPosition, currentLocation }) => {
  return (
    <React.Fragment>
      {currentLocation.isLocating && <LoadingModal text="We are trying to locate you..." />}
      <Icon
        name="arrow"
        className="page-header__item icon--clickable"
        title="Get forecast for current position"
        size="20px"
        onClick={() => getCurrentPosition()}
      />
    </React.Fragment>
  );
};

export default CurrentPosition;
