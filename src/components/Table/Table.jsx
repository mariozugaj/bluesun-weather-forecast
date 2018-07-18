import React from "react";
import PropTypes from "prop-types";

export const Table = ({ size = 5, ...props }) => {
  const styles = {
    gridTemplateColumns: `3fr repeat(${size}, 1fr)`,
  };

  return (
    <section className="table" style={styles}>
      {props.children}
    </section>
  );
};

Table.propTypes = {
  size: PropTypes.number.isRequired,
};
