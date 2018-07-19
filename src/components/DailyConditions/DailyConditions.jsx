import React from "react";

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

export default DailyConditions;
