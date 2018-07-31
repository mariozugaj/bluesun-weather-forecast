import React from "react";
import PropTypes from "prop-types";

import Loader from "components/Loader";

const LoadingModal = ({ text = "", className = "loading-modal-wrapper" }) => {
  return (
    <div className={className}>
      {text !== "" && <h2>{text}</h2>}
      <Loader />
    </div>
  );
};

LoadingModal.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

export default LoadingModal;
