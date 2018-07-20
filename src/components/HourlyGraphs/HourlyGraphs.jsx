import React from "react";
import { extent } from "d3-array";

import TemperatureGraph from "./TemperatureGraph";
import PrecipitationGraph from "./PrecipitationGraph";

const HourlyGraphs = ({ forecast }) => {
  const temperatureData = forecast.data.map(data => {
    const { temperature, time } = data;
    return { temperature, time };
  });

  const precipitationData = forecast.data.map(data => {
    const { precipIntensity, time } = data;
    return { precipIntensity, time };
  });

  const diff = (data, callback) => extent(data, callback);

  const tempDiff = diff(temperatureData, d => d.temperature);
  const tempHeight = tempDiff[1] - tempDiff[0] > 15 ? 300 : 250;

  const anyPrecipitation = precipitationData.some(dataPoint => dataPoint.precipIntensity > 0);
  const precipDiff = diff(precipitationData, d => d.precipIntensity);
  const precipHeight = precipDiff[1] - precipDiff[0] > 5 ? 250 : 100;

  return (
    <React.Fragment>
      <TemperatureGraph
        width={1235}
        height={tempHeight}
        margin={{ left: 30, top: 40, right: 20, bottom: 30 }}
        data={temperatureData}
      />
      {anyPrecipitation && (
        <PrecipitationGraph
          width={1235}
          height={precipHeight}
          margin={{ left: 30, top: 40, right: 20, bottom: 20 }}
          data={precipitationData}
        />
      )}
    </React.Fragment>
  );
};

export default HourlyGraphs;
