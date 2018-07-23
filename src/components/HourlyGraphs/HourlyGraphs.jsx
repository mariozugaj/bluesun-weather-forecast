import React from "react";
import { extent } from "d3-array";

import TemperatureGraph from "./TemperatureGraph";
import PrecipitationGraph from "./PrecipitationGraph";
import WindGraph from "./WindGraph";
import UVIndexGraph from "./UVIndexGraph";
import CloudCoverGraph from "./CloudCoverGraph";

const HourlyGraphs = ({ forecast }) => {
  const WIDTH = 1235;
  const DEFAULT_MARGINS = { left: 30, top: 20, right: 20, bottom: 20 };

  const dataFor = key => {
    return forecast.data.map(data => {
      return { [key]: data[key], time: data.time };
    });
  };
  const minMax = (data, callback) => extent(data, callback);
  const largeHeight = diff => (diff[1] - diff[0] > 15 ? 300 : 250);
  const mediumHeight = diff => (diff[1] - diff[0] > 5 ? 250 : 150);
  const smallHeight = diff => (diff[1] - diff[0] > 5 ? 250 : 100);

  const height = (key, size) => {
    const diff = minMax(dataFor(key), d => d[key]);
    switch (size) {
      case "small":
        return smallHeight(diff);
      case "medium":
        return mediumHeight(diff);
      case "large":
        return largeHeight(diff);
      default:
        return largeHeight(diff);
    }
  };

  const anyCondition = (condition, amount) =>
    dataFor(condition).some(dataPoint => dataPoint[condition] > amount);

  const tempData = forecast.data.map(data => {
    const { temperature, apparentTemperature, time } = data;
    return { temperature, apparentTemperature, time };
  });

  return (
    <React.Fragment>
      <TemperatureGraph
        width={WIDTH}
        height={300}
        margin={{ left: 35, top: 40, right: 20, bottom: 30 }}
        data={tempData}
      />
      {anyCondition("precipIntensity", 0.05) && (
        <PrecipitationGraph
          width={WIDTH}
          height={height("precipIntensity", "small")}
          margin={DEFAULT_MARGINS}
          data={dataFor("precipIntensity")}
        />
      )}
      {anyCondition("cloudCover", 0) && (
        <CloudCoverGraph
          width={WIDTH}
          height={250}
          margin={DEFAULT_MARGINS}
          data={dataFor("cloudCover")}
        />
      )}
      <WindGraph
        width={WIDTH}
        height={height("windSpeed", "medium")}
        margin={DEFAULT_MARGINS}
        data={dataFor("windSpeed")}
      />
      <UVIndexGraph width={WIDTH} height={200} margin={DEFAULT_MARGINS} data={dataFor("uvIndex")} />
    </React.Fragment>
  );
};

export default HourlyGraphs;
