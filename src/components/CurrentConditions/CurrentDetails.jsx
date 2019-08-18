import React from "react";
import PropTypes from "prop-types";

import { titleize, round, uvClass } from "helpers";

const Detail = ({
  label = "",
  value = 0,
  unit = "",
  direction = null,
  className = "",
}) => (
  <li className="current-details__item">
    <span className="current-details__label">{`${titleize(label)}:`}</span>
    <span className="current-details__value">
      <span className={`current-details__num ${className}`}>{value}</span>
      <span className="current-details__unit">{unit}</span>
      {direction && (
        <span
          className="current-details__direction"
          style={{ transform: `rotate(${direction}deg)` }}
        >
          ↑
        </span>
      )}
    </span>
  </li>
);

export const CurrentDetails = ({ forecast, units }) => {
  const details = [
    ["windSpeed", units.windSpeed],
    ["humidity", "%"],
    ["dewPoint", "˚"],
    ["uvIndex", ""],
    ["visibility", units.visibility],
    ["pressure", units.pressure],
  ];
  const currentlyData = details.map(detail => (
    <Detail
      label={detail[0]}
      value={
        detail[0] === "humidity"
          ? round(forecast.currently[detail[0]] * 100, 0)
          : round(forecast.currently[detail[0]], 0)
      }
      unit={detail[1]}
      key={detail[0]}
      direction={
        detail[0] === "windSpeed" ? forecast.currently.windBearing - 180 : null
      }
      className={
        detail[0] === "uvIndex" ? uvClass(forecast.currently[detail[0]]) : ""
      }
    />
  ));

  return <ul className="current-details-wrapper">{currentlyData}</ul>;
};

CurrentDetails.propTypes = {
  forecast: PropTypes.shape({
    currently: PropTypes.shape({
      humidity: PropTypes.number,
      windSpeed: PropTypes.number,
      windBearing: PropTypes.number,
      uvIndex: PropTypes.number,
      visibility: PropTypes.number,
      pressure: PropTypes.number,
      dewPoint: PropTypes.number,
    }).isRequired,
  }),
  units: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
};

Detail.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  direction: PropTypes.number,
  className: PropTypes.string,
};

export default CurrentDetails;
