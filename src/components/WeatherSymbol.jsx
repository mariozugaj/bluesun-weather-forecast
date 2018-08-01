import React from "react";
import PropTypes from "prop-types";

import Icon from "components/Icon";
import { round, tempClass } from "helpers";

const WeatherSymbol = ({ summary = "", condition = "", temperature = 0, freezingPoint }) => {
  return (
    <figure className="weather-symbol__wrapper">
      <Icon name={condition} title={summary} alt={summary} size={50} />
      <span className={tempClass(temperature, freezingPoint)}>{round(temperature, 0)}°</span>
    </figure>
  );
};

WeatherSymbol.propTypes = {
  summary: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  freezingPoint: PropTypes.number.isRequired,
};

export default WeatherSymbol;
