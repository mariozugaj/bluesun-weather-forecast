import React from "react";
import PropTypes from "prop-types";

import Icons from "icons.svg";

const Icon = ({ name = "", className = "", size = 100, title = "", alt = "", onClick }) => (
  <svg
    className={`icon ${className}`}
    width={size}
    height={size}
    onClick={onClick}
    onKeyPress={onClick}
    tabIndex="0"
    preserveAspectRatio="xMidYMid"
  >
    <title>{title}</title>
    <alt>{alt}</alt>
    <use xlinkHref={`${Icons}#icon-${name}`} />
  </svg>
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.number,
  title: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Icon;
