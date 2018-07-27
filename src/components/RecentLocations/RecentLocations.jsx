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

const RecentLocations = ({ recentLocations, forecast, ...props }) => {
  const handleStarClick = (coordinates, event) => {
    event.preventDefault();
    props.addFavoriteLocation(coordinates);
  };

  const handleDeleteClick = (coordinates, event) => {
    event.preventDefault();
    props.deleteRecentLocation(coordinates);
  };

  const renderRows = () => {
    return recentLocations.map(location => {
      const forecastForLocation = forecast.byLocation[location.coordinates];
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
        <Row
          to={`/forecast/daily/${location.coordinates}`}
          key={location.coordinates}
          size={5}
          extra={true}
        >
          <h3 title={location.label}>{location.label}</h3>
          {rowContent}
          <span className="visited-locations__actions">
            <Icon
              size={15}
              name="star-empty"
              onClick={event => handleStarClick(location.coordinates, event)}
              title="Add location to favorites"
            />
            <Icon
              size={15}
              name="delete"
              onClick={event => handleDeleteClick(location.coordinates, event)}
              title="Remove location from recent"
            />
          </span>
        </Row>
      );
    });
  };
  const headerRowContent = nextDays(5)();

  return (
    <React.Fragment>
      <h2 className="visited-locations__title">Recent locations</h2>
      <Table size={5} extra={true}>
        <HeaderRow content={headerRowContent} size={5} extra={true} />
        {renderRows()}
      </Table>
    </React.Fragment>
  );
};

RecentLocations.propTypes = {
  recentLocations: PropTypes.arrayOf(
    PropTypes.shape({
      coordinates: PropTypes.string.isRequired,
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

export default RecentLocations;
