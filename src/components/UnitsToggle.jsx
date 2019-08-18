import React from "react";
import PropTypes from "prop-types";

const UnitsToggle = ({ currentUnits, changeUnits }) => {
  const handleChange = event => {
    changeUnits(event.target.value);
  };

  return (
    <select
      name="units"
      id="units"
      onChange={handleChange}
      defaultValue={currentUnits}
    >
      <option value="si">˚C, m/s</option>
      <option value="us">˚F, mph</option>
    </select>
  );
};

UnitsToggle.propTypes = {
  currentUnits: PropTypes.oneOf(["si", "us"]).isRequired,
  changeUnits: PropTypes.func.isRequired,
};

export default UnitsToggle;
