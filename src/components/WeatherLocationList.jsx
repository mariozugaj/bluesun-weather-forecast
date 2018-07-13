import React from "react";
import { Link } from "react-router-dom";

import "./WeatherLocationList.css";
import Icon from "./Icon";
import { nextNDays, round } from "../utils/utils";

const WeatherSymbol = props => {
  return (
    <figure className="weather-location-list__icon-wrapper">
      <Icon name={props.condition} title="Clear day" size={50} />
      <span className="temperature--warm">{round(props.temperature, 0)}°</span>
    </figure>
  );
};

const DataRow = props => {
  const mappedWeatherSymbols = props.forecast.data.slice(0, 5).map(day => {
    return (
      <WeatherSymbol
        condition={day.icon}
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

  const latestUpdate = new Date(forecasts[Object.keys(visitedLocations)[0]].fetchedAt);
  const latestUpdateTime = latestUpdate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return (
    <React.Fragment>
      <h2 className="weather-location-list__title">Recent locations</h2>
      <section className="weather-location-list">
        <HeadingRow />
        {mappedDataRows}
      </section>
      <p className="latest-update-text">
        Latest update at <time dateTime={latestUpdate}>{latestUpdateTime}</time>
      </p>
    </React.Fragment>
  );
};

export default WeatherLocationList;
