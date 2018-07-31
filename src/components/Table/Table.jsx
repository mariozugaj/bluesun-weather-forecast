import React from "react";
import PropTypes from "prop-types";

export const Table = ({ size = 5, extra = false, ...props }) => {
  const styles = {
    gridTemplateColumns: `3fr repeat(${size}, 1fr) ${extra ? "40px" : ""}`,
  };

  return (
    <section className="table" style={styles}>
      {props.children}
    </section>
  );
};

Table.propTypes = {
  size: PropTypes.number,
  extra: PropTypes.bool,
};
