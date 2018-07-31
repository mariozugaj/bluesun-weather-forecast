import React from "react";
import PropTypes from "prop-types";

import Icon from "components/Icon";
import { round } from "helpers";

const WeatherSymbol = ({ summary = "", condition = "", temperature = 0 }) => {
  return (
    <figure className="weather-symbol__wrapper">
      <Icon name={condition} title={summary} alt={summary} size={50} />
      <span className="temperature--warm">{round(temperature, 0)}°</span>
    </figure>
  );
};

WeatherSymbol.propTypes = {
  summary: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
};

export default WeatherSymbol;
