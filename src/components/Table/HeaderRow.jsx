import React from "react";
import PropTypes from "prop-types";

export const HeaderRow = ({ size = 5, content = [], extra = false }) => {
  const styles = {
    gridTemplateColumns: `repeat(${size}, 1fr) ${extra ? "40px" : ""}`,
  };
  return (
    <header className="table__header-row" style={styles}>
      {content.map(item => <h4 key={item}>{item}</h4>)}
    </header>
  );
};

HeaderRow.propTypes = {
  size: PropTypes.number,
  content: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  extra: PropTypes.bool,
};
