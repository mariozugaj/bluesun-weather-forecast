import React from "react";

import CurrentDetails from "./CurrentDetails";
import CurrentHero from "./CurrentHero";
import LoadingModal from "components/LoadingModal";

const CurrentConditions = ({ forecast = {}, isFetching }) => {
  const forecastLoaded = Object.keys(forecast).length !== 0 && !isFetching;

  return (
    <section className="current-conditions-wrapper">
      <div className="layout-container">
        {forecastLoaded ? (
          <React.Fragment>
            <CurrentDetails {...forecast} />
            <CurrentHero {...forecast} />
          </React.Fragment>
        ) : (
          <LoadingModal text="Fetching forecast..." />
        )}
      </div>
    </section>
  );
};

export default CurrentConditions;
