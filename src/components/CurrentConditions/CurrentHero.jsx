import React from "react";

import Icon from "components/Icon";
import { round } from "helpers";

const CurrentHero = props => (
  <article className="current-hero">
    <div className="current-hero__conditions">
      <Icon
        name={props.currently.icon}
        size={150}
        title={props.currently.summary}
        alt={props.currently.summary}
      />

      <span className="current-hero__description">
        <h2 className="current-hero__summary">{`${round(props.currently.temperature, 0)}˚ ${
          props.currently.summary
        }`}</h2>

        <p className="summary-high-low">
          <span className="current-hero__value">
            <span className="current-hero__label">Feels Like: </span>
            <span className="current-hero__num">{`${round(
              props.currently.apparentTemperature,
              0
            )}˚`}</span>
          </span>

          <span className="current-hero__value">
            <span className="current-hero__label">High: </span>
            <span className="current-hero__num">{`${round(
              props.daily.data[0].temperatureMax,
              0
            )}˚`}</span>
          </span>

          <span className="current-hero__value">
            <span className="current-hero__label">Low: </span>
            <span className="current-hero__num">{`${round(
              props.daily.data[0].temperatureMin,
              0
            )}˚`}</span>
          </span>
        </p>
      </span>
    </div>

    <h2 className="current-hero__title">{props.hourly.summary}</h2>
  </article>
);

export default CurrentHero;
