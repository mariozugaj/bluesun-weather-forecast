import React from "react";
import PropTypes from "prop-types";

import { Row, RowItem } from "components/Table";
import Icon from "components/Icon";
import { round, uvClass, tempClass } from "helpers";

const DailyRowsTemplate = ({ forecast }) => {
  const notValidTimezone = /GMT/gm.test(forecast.timezone);
  const timeZone = !notValidTimezone ? forecast.timezone : "Europe/Zagreb";

  return forecast.daily.data.map(dataPoint => {
    const date = new Date(dataPoint.time * 1000).toLocaleDateString("en-GB", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: timeZone,
    });

    const time = timeStamp => {
      return new Date(timeStamp).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: timeZone,
      });
    };

    return (
      <Row key={dataPoint.time} size={11}>
        <h3 title={date}>{date}</h3>

        <RowItem>
          <Icon name={dataPoint.icon} alt={dataPoint.summary} title={dataPoint.summary} size={50} />
        </RowItem>

        <RowItem>
          <span className={tempClass(dataPoint.temperatureMax)}>{`${round(
            dataPoint.temperatureMax,
            0
          )}˚`}</span>
        </RowItem>

        <RowItem>
          <span className={tempClass(dataPoint.temperatureMin)}>{`${round(
            dataPoint.temperatureMin,
            0
          )}˚`}</span>
        </RowItem>

        <RowItem>
          <span className="precipitation">{round(dataPoint.precipIntensity * 24, 0)}</span>
        </RowItem>

        <RowItem>
          <span>{round(dataPoint.precipProbability * 100, 0)}</span>
        </RowItem>

        <RowItem>
          <span>{`${round(dataPoint.cloudCover * 100, 0)}%`}</span>
        </RowItem>

        <RowItem>
          <span>{`${round(dataPoint.pressure, 0)} hPa`}</span>
        </RowItem>

        <RowItem>
          <span>{dataPoint.sunriseTime ? time(dataPoint.sunriseTime * 1000) : "N/A"}</span>
        </RowItem>

        <RowItem>
          <span>{dataPoint.sunsetTime ? time(dataPoint.sunsetTime * 1000) : "N/A"}</span>
        </RowItem>

        <RowItem>
          <span className={uvClass(dataPoint.uvIndex)}>{dataPoint.uvIndex}</span>
        </RowItem>

        <RowItem>
          <span>
            <span>{round(dataPoint.windSpeed, 0)}</span>
            <span> m/s </span>
            <span
              style={{
                transform: `rotate(${dataPoint.windBearing - 180}deg)`,
                display: "inline-block",
              }}
            >
              ↑
            </span>
          </span>
        </RowItem>
      </Row>
    );
  });
};

DailyRowsTemplate.propTypes = {
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

export default DailyRowsTemplate;
