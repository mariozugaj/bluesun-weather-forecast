import React from "react";

import CurrentDetails from "./CurrentDetails";
import CurrentHero from "./CurrentHero";

const CurrentConditions = ({ forecast = {}, isFetching }) => {
  return (
    <section className="current-conditions-wrapper">
      <div className="layout-container">
        <CurrentDetails {...forecast} />
        <CurrentHero {...forecast} />
      </div>
    </section>
  );
};

export default CurrentConditions;
