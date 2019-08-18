import React from "react";
import PropTypes from "prop-types";

import { Table, HeaderRow } from "components/Table";
import DailyRowsTemplate from "./DailyRowsTemplate";

const DailyConditions = props => {
  const headerRowContent = [
    "Conditions",
    "Temp. max",
    "Temp. min",
    "Precip.",
    "Precip. %",
    "Cloud cover",
    "Humidity",
    "Sunrise",
    "Sunset",
    "Daylight",
    "UV index",
    "Wind speed",
  ];

  return (
    <section className="layout-container">
      <Table size={12}>
        <HeaderRow content={headerRowContent} size={12} />
        <DailyRowsTemplate {...props} />
      </Table>
    </section>
  );
};

DailyConditions.propTypes = {
  forecast: PropTypes.shape({
    daily: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          temperatureMax: PropTypes.number,
          temperatureMin: PropTypes.number,
          time: PropTypes.number,
          windSpeed: PropTypes.number,
          windBearing: PropTypes.number,
          precipIntensity: PropTypes.number,
          cloudCover: PropTypes.number,
          uvIndex: PropTypes.number,
          sunsetTime: PropTypes.number,
          sunriseTime: PropTypes.number,
          precipProbability: PropTypes.number,
          humidity: PropTypes.number,
        })
      ),
    }),
  }),
  units: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
};

export default DailyConditions;
