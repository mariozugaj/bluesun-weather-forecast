import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

export const Row = ({ size = 5, to = null, children, extra = false, ...props }) => {
  const styles = {
    gridTemplateColumns: `3fr repeat(${size}, 1fr) ${extra ? "40px" : ""}`,
  };

  if (to) {
    return (
      <Link to={to} className="table__row" style={styles}>
        {children}
      </Link>
    );
  } else {
    return (
      <div {...props} className="table__row" style={styles}>
        {children}
      </div>
    );
  }
};

Row.propTypes = {
  size: PropTypes.number,
  to: PropTypes.string,
};
