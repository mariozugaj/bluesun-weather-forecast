import React from "react";

import Loader from "components/Loader";

const LoadingModal = ({ text = "", className = "loading-modal-wrapper" }) => {
  return (
    <div className={className}>
      {text !== "" && <h2>{text}</h2>}
      <Loader />
    </div>
  );
};

export default LoadingModal;
