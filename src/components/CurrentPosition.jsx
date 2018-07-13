import React from "react";

import Icon from "./Icon";

const CurrentPosition = props => {
  const handleClick = () => {
    props.getCurrentPosition();
  };

  return (
    <span className="page-header__icon">
      <Icon
        name="arrow"
        title="Get forecast for current location"
        size="25px"
        onClick={handleClick}
      />
    </span>
  );
};

export default CurrentPosition;
