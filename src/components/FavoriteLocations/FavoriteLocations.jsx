import React from "react";
import PropTypes from "prop-types";

import { Table, HeaderRow, Row } from "components/Table";
import Icon from "components/Icon";
import { nextDays } from "helpers";
import WeatherSymbol from "components/WeatherSymbol";

const FavoriteLocations = ({
  favoriteLocations,
  forecast,
  deleteFavoriteLocation,
  units: { freezingPoint },
}) => {
  const handleDeleteClick = (coordinates, event) => {
    event.preventDefault();
    deleteFavoriteLocation(coordinates);
  };

  const renderRows = () => {
    return favoriteLocations.map(location => {
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
              freezingPoint={freezingPoint}
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
              name="delete"
              onClick={event => handleDeleteClick(location.coordinates, event)}
              title="Remove location from favorites"
              alt="Remove location from favorites"
            />
          </span>
        </Row>
      );
    });
  };
  const headerRowContent = nextDays(5)();

  return (
    <React.Fragment>
      <h2 className="visited-locations__title">Favorite locations</h2>
      <Table size={5} extra={true}>
        <HeaderRow content={headerRowContent} size={5} extra={true} />
        {renderRows()}
      </Table>
    </React.Fragment>
  );
};

FavoriteLocations.propTypes = {
  favoriteLocations: PropTypes.arrayOf(
    PropTypes.shape({
      coordinates: PropTypes.string,
      label: PropTypes.string,
      visitedAt: PropTypes.number,
    })
  ).isRequired,
  forecast: PropTypes.shape({
    isFetching: PropTypes.bool,
    error: PropTypes.object,
    byLocation: PropTypes.objectOf(PropTypes.object),
  }).isRequired,
  deleteFavoriteLocation: PropTypes.func.isRequired,
  units: PropTypes.shape({
    freezingPoint: PropTypes.number.isRequired,
  }),
};

export default FavoriteLocations;
