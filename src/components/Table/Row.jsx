import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

export const Row = props => {
  const styles = {
    gridTemplateColumns: `3fr repeat(${props.size}, 1fr)`,
  };

  if (props.to) {
    return (
      <Link to={props.to} className="table__row" style={styles}>
        {props.children}
      </Link>
    );
  } else {
    return (
      <div {...props} className="table__row" style={styles}>
        {props.children}
      </div>
    );
  }
};

Row.propTypes = {
  size: PropTypes.number,
  to: PropTypes.string,
};
