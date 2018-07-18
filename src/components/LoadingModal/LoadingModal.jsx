import React from "react";

import Loader from "components/Loader";

const LoadingModal = ({ text = "" }) => {
  return (
    <div className="loading-modal-wrapper">
      {text !== "" && <h2>{text}</h2>}
      <Loader />
    </div>
  );
};

export default LoadingModal;
