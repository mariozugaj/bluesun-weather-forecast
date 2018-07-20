import React from "react";
import { Grid } from "@vx/grid";
import { Group } from "@vx/group";
import { curveBasis } from "@vx/curve";
import { AxisLeft, AxisTop } from "@vx/axis";
import { LinePath } from "@vx/shape";
import { scaleTime, scaleLinear } from "@vx/scale";
import { extent, max, min } from "d3-array";

export const TemperatureGraph = ({ width, height, margin, data }) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const x = d => new Date(d.time * 1000);
  const y = d => d.temperature;

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });

  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [min(data, y) - 3, max(data, y) + 2],
    nice: true,
  });

  // debugger;

  return (
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
      <Grid
        top={margin.top * 1.2}
        left={margin.left}
        xScale={xScale}
        yScale={yScale}
        width={xMax}
        height={yMax}
        className="grid-lines__line"
        numTicksRows={height > 250 ? 9 : 7}
      />
      <Group top={margin.top * 1.2} left={margin.left}>
        <LinePath
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke="url(#tempGradient)"
          strokeWidth={2}
          curve={curveBasis}
        />
      </Group>
      <Group left={margin.left}>
        <AxisLeft
          top={margin.top * 1.2}
          left={0}
          scale={yScale}
          stroke={"#1b1a1e"}
          strokeWidth={0.5}
          tickTextFill={"#1b1a1e"}
          numTicks={height > 250 ? 9 : 7}
          tickFormat={val => `${val}˚`}
          hideTicks={true}
          hideAxisLine={true}
          tickLabelProps={() => ({ fontSize: 12, textAnchor: "end" })}
        />
        <text x={0} y={height - 4} transform="" fontSize={12}>
          Temperature °C
        </text>
        <AxisTop
          top={margin.top}
          left={0}
          scale={xScale}
          hideTicks={true}
          hideAxisLine={true}
          tickLabelProps={() => ({ fontSize: "1em", fontWeight: 400, textAnchor: "middle" })}
        />
        />
      </Group>
    </svg>
  );
};

export default TemperatureGraph;
