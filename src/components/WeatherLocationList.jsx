import React from "react";
import { Link } from "react-router-dom";

import "./WeatherLocationList.css";
import Icon from "./Icon";
import { nextNDays, round } from "../utils/utils";

const WeatherSymbol = props => {
  return (
    <figure className="weather-location-list__icon-wrapper">
      <Icon name={props.condition} title={props.summary} size={50} />
      <span className="temperature--warm">{round(props.temperature, 0)}°</span>
    </figure>
  );
};

const DataRow = props => {
  const mappedWeatherSymbols = props.forecast.data.slice(0, 5).map(day => {
    return (
      <WeatherSymbol
        condition={day.icon}
        summary={day.summary}
        temperature={day.apparentTemperatureHigh}
        key={day.time}
      />
    );
  });
  return (
    <Link to={`/forecast/daily/${props.linkLocation}`} className="weather-location-list__data-row">
      <h3 className="weather-location-list__location-name">{props.label}</h3>
      {mappedWeatherSymbols}
    </Link>
  );
};

const HeadingRow = props => {
  const headingDayNames = nextNDays(5)().map(dayName => <span key={dayName}>{dayName}</span>);
  return <header className="weather-location-list__heading-row">{headingDayNames}</header>;
};

const WeatherLocationList = ({ forecasts = {}, visitedLocations = {} }) => {
  const mappedDataRows = Object.keys(visitedLocations).map(location => {
    return (
      <DataRow
        forecast={forecasts[location].daily}
        key={location}
        label={visitedLocations[location].label}
        linkLocation={location}
      />
    );
  });

  return (
    <React.Fragment>
      {Object.keys(visitedLocations).length === 0 ? (
        <div className="center-page-text-wrapper">
          <h2>As it turns out, you haven't yet visited any locations.</h2>
        </div>
      ) : (
        <React.Fragment>
          <h2 className="weather-location-list__title">Recent locations</h2>
          <section className="weather-location-list">
            <HeadingRow />
            {mappedDataRows}
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default WeatherLocationList;
