import React from "react";
import PropTypes from "prop-types";

import { Table, HeaderRow, Row } from "components/Table";
import Icon from "components/Icon";
import { nextDays, round } from "helpers";

const WeatherSymbol = ({ summary = "", condition = "", temperature = 0 }) => {
  return (
    <figure className="weather-symbol__wrapper">
      <Icon name={condition} title={summary} size={50} />
      <span className="temperature--warm">{round(temperature, 0)}°</span>
    </figure>
  );
};

WeatherSymbol.propTypes = {
  summary: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
};

const VisitedLocations = ({ visitedLocations = [], forecast = {} }) => {
  const renderRows = () => {
    return visitedLocations.map(location => {
      const forecastForLocation = forecast.byLocation[location.id];
      const rowContent =
        forecastForLocation &&
        forecastForLocation.daily.data
          .slice(0, 5)
          .map(day => (
            <WeatherSymbol
              condition={day.icon}
              summary={day.summary}
              temperature={day.apparentTemperatureHigh}
              key={day.time}
            />
          ));

      return (
        <Row to={`/forecast/daily/${location.id}`} key={location.id} size={5}>
          <h3>{location.label}</h3>
          {rowContent}
        </Row>
      );
    });
  };
  const headerRowContent = nextDays(5)();

  return (
    <React.Fragment>
      <h2 className="visited-locations__title">Recent locations</h2>
      <Table size={5}>
        <HeaderRow content={headerRowContent} size={5} />
        {renderRows()}
      </Table>
    </React.Fragment>
  );
};

VisitedLocations.propTypes = {
  visitedLocations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      visitedAt: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      lat: PropTypes.number,
      lng: PropTypes.number,
    })
  ).isRequired,
  forecast: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    byLocation: PropTypes.object.isRequired,
  }).isRequired,
};

export default VisitedLocations;
