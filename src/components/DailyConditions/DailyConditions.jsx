import React from "react";
import PropTypes from "prop-types";

import { Table, HeaderRow } from "components/Table";
import DailyRowsTemplate from "./DailyRowsTemplate";

const DailyConditions = forecast => {
  const headerRowContent = [
    "Conditions",
    "Temp. max",
    "Temp. min",
    "Precip. mm",
    "Precip. %",
    "Cloud cover",
    "Pressure",
    "Sunrise",
    "Sunset",
    "UV index",
    "Wind speed",
  ];

  return (
    <section className="layout-container">
      <Table size={11}>
        <HeaderRow content={headerRowContent} size={11} />
        <DailyRowsTemplate {...forecast} />
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
          pressure: PropTypes.number,
        })
      ),
    }),
  }),
};

export default DailyConditions;
