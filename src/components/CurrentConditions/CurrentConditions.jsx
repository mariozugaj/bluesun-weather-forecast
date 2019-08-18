import React from "react";
import PropTypes from "prop-types";

import CurrentDetails from "./CurrentDetails";
import CurrentHero from "./CurrentHero";

const CurrentConditions = ({ forecast = {}, units }) => {
  return (
    <section className="current-conditions-wrapper">
      <div className="layout-container">
        <CurrentDetails forecast={forecast} units={units} />
        <CurrentHero {...forecast} />
      </div>
    </section>
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
    units: PropTypes.string.isRequired,
  }),
  units: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
};

export default CurrentConditions;
