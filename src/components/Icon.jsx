import React from "react";

import Icons from "../images/icons.svg";

const Icon = ({ name, className = "", size = 100, title = "", alt = "", onClick }) => (
  <svg
    className={`icon ${className}`}
    width={size}
    height={size}
    onClick={onClick}
    onKeyPress={onClick}
    tabIndex="0">
    <title>{title}</title>
    <alt>{alt}</alt>
    <use xlinkHref={`${Icons}#icon-${name}`} />
  </svg>
);

export default Icon;
