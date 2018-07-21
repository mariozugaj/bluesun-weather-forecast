import React from "react";
import { Grid } from "@vx/grid";
import { Group } from "@vx/group";
import { curveNatural } from "@vx/curve";
import { AxisLeft, AxisTop } from "@vx/axis";
import { scaleTime, scaleLinear } from "@vx/scale";
import { extent, max, min } from "d3-array";
import { LinePath } from "@vx/shape";

export const TemperatureGraph = ({ width, height, margin, data }) => {
  if (width < 10) return null;

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top * 1.5 - margin.bottom;

  const x = d => new Date(d.time * 1000);
  const y = d => d.temperature;
  const z = d => d.apparentTemperature;

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });

  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [min(data, d => min([y(d), z(d)])) - 2, max(data, d => max([y(d), z(d)])) + 2],
    nice: true,
  });

  const numTicksForHeight = height => (height > 299 ? 10 : 7);

  return (
    <figure className="graph-wrapper">
      <svg width={width} height={height}>
        <defs>
          <linearGradient
            id="tempGradient"
            x1={0}
            y1={yScale(2)}
            x2={0}
            y2={yScale(-2)}
            gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c60000" />
            <stop offset="50%" stopColor="#c60000" />
            <stop offset="50%" stopColor="blue" />
            <stop offset="100%" stopColor="blue" />
          </linearGradient>
        </defs>
        <Group top={margin.top * 1.5} left={margin.left}>
          <Grid
            top={0}
            left={0}
            xScale={xScale}
            yScale={yScale}
            width={xMax}
            height={yMax}
            className="grid-lines__line"
            numTicksRows={numTicksForHeight(height)}
          />
          <LinePath
            data={data}
            xScale={xScale}
            yScale={yScale}
            x={x}
            y={y}
            stroke="url(#tempGradient)"
            strokeWidth={2}
            curve={curveNatural}
          />
          <LinePath
            data={data}
            xScale={xScale}
            yScale={yScale}
            x={x}
            y={z}
            stroke="url(#tempGradient)"
            strokeWidth={1}
            strokeDasharray="2,2"
            curve={curveNatural}
          />
        </Group>
        <AxisLeft
          top={margin.top * 1.5}
          left={margin.left}
          scale={yScale}
          tickTextFill={"#1b1a1e"}
          numTicks={numTicksForHeight(height)}
          tickFormat={val => `${val}˚`}
          hideTicks={true}
          hideAxisLine={true}
          tickLabelProps={() => ({ fontSize: 12, textAnchor: "end" })}
        />
        <AxisTop
          top={margin.top}
          left={margin.left}
          scale={xScale}
          hideTicks={true}
          hideAxisLine={true}
          tickLabelProps={() => ({ fontSize: "1em", fontWeight: 400, textAnchor: "middle" })}
        />
        <Group left={margin.left} top={height - 10}>
          <text fontSize={12}>Temperature °C | Feels like °C</text>
        </Group>
      </svg>
    </figure>
  );
};

export default TemperatureGraph;
