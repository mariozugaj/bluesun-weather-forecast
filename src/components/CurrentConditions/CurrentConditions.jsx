import React from "react";
import PropTypes from "prop-types";

import CurrentDetails from "./CurrentDetails";
import CurrentHero from "./CurrentHero";

const CurrentConditions = ({ forecast = {} }) => {
  return (
    <div className="current-conditions-wrapper">
      <div className="layout-container">
        <CurrentDetails {...forecast} />
        <CurrentHero {...forecast} />
      </div>
    </div>
  );
};

CurrentConditions.propTypes = {
  forecast: PropTypes.shape({
    currently: PropTypes.shape({
      humidity: PropTypes.number,
      windSpeed: PropTypes.number,
      windBearing: PropTypes.number,
      uvIndex: PropTypes.number,
      visibility: PropTypes.number,
      pressure: PropTypes.number,
      dewPoint: PropTypes.number,
      icon: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      temperature: PropTypes.number.isRequired,
      apparentTemperature: PropTypes.number.isRequired,
    }).isRequired,
    daily: PropTypes.shape({
      daily: PropTypes.arrayOf(
        PropTypes.shape({
          temperatureMax: PropTypes.number.isRequired,
          temperatureMin: PropTypes.number.isRequired,
        })
      ),
    }).isRequired,
    hourly: PropTypes.shape({
      summary: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export default CurrentConditions;
