import React from "react";

import { titleize, round } from "helpers";

const Detail = ({ label, value, unit }) => (
  <li className="current-details__item">
    <span className="current-details__label">{`${titleize(label)}:`}</span>
    <span className="current-details__value">
      <span className="current-details__num">{value}</span>
      <span className="current-details__unit">{unit}</span>
    </span>
  </li>
);

const CurrentDetails = forecast => {
  const details = [
    ["windSpeed", "m/s"],
    ["humidity", "%"],
    ["dewPoint", "˚"],
    ["uvIndex", ""],
    ["visibility", "km"],
    ["pressure", "hPa"],
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
    />
  ));

  return <ul className="current-details-wrapper">{currentlyData}</ul>;
};

export default CurrentDetails;
