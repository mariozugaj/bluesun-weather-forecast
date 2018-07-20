import React from "react";
import { extent } from "d3-array";

import TemperatureGraph from "./TemperatureGraph";
import PrecipitationGraph from "./PrecipitationGraph";
import WindGraph from "./WindGraph";
import UVIndexGraph from "./UVIndexGraph";

const HourlyGraphs = ({ forecast }) => {
  const dataFor = key => {
    return forecast.data.map(data => {
      return { [key]: data[key], time: data.time };
    });
  };
  const minMax = (data, callback) => extent(data, callback);
  const largeHeight = diff => (diff[1] - diff[0] > 15 ? 300 : 250);
  const mediumHeight = diff => (diff[1] - diff[0] > 5 ? 250 : 150);
  const smallHeight = diff => (diff[1] - diff[0] > 5 ? 250 : 100);

  const anyPrecipitation = dataFor("precipIntensity").some(
    dataPoint => dataPoint.precipIntensity > 0.05
  );

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

  return (
    <React.Fragment>
      <TemperatureGraph
        width={1235}
        height={height("temperature", "large")}
        margin={{ left: 35, top: 40, right: 20, bottom: 30 }}
        data={dataFor("temperature")}
      />
      {anyPrecipitation && (
        <PrecipitationGraph
          width={1235}
          height={height("precipIntensity", "small")}
          margin={{ left: 30, top: 40, right: 20, bottom: 20 }}
          data={dataFor("precipIntensity")}
        />
      )}
      <WindGraph
        width={1235}
        height={height("windSpeed", "medium")}
        margin={{ left: 30, top: 40, right: 20, bottom: 20 }}
        data={dataFor("windSpeed")}
      />
      <UVIndexGraph
        width={1235}
        height={height("uvIndex", "medium")}
        margin={{ left: 30, top: 40, right: 20, bottom: 20 }}
        data={dataFor("uvIndex")}
      />
    </React.Fragment>
  );
};

export default HourlyGraphs;