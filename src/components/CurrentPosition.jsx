import React from "react";
import PropTypes from "prop-types";

import Icon from "components/Icon";
import LoadingModal from "components/LoadingModal";

const CurrentPosition = ({
  getCurrentPosition,
  currentPosition: { isLocating },
}) => {
  return (
    <React.Fragment>
      {isLocating && <LoadingModal text="We are trying to locate you..." />}
      <Icon
        name="arrow"
        className="page-header__item icon--clickable"
        title="Get forecast for current position"
        alt="Get forecast for current position"
        size={20}
        onClick={() => getCurrentPosition()}
      />
    </React.Fragment>
  );
};

CurrentPosition.propTypes = {
  getCurrentPosition: PropTypes.func.isRequired,
  currentPosition: PropTypes.shape({
    error: PropTypes.object,
    isLocating: PropTypes.bool.isRequired,
  }),
};

export default CurrentPosition;
