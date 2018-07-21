import React from "react";
import { Grid } from "@vx/grid";
import { Group } from "@vx/group";
import { curveBasis } from "@vx/curve";
import { AxisLeft } from "@vx/axis";
import { LinePath } from "@vx/shape";
import { scaleTime, scaleLinear } from "@vx/scale";
import { extent, max, min } from "d3-array";

export const UVIndexGraph = ({ width, height, margin, data }) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const x = d => new Date(d.time * 1000);
  const y = d => d.uvIndex;

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });

  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(data, y) + 1],
    nice: true,
  });

  return (
    <svg width={width} height={height}>
      <defs>
        <linearGradient
          id="uvGradient"
          x1={0}
          y1={yScale(0)}
          x2={0}
          y2={yScale(13)}
          gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="green" />
          <stop offset="22.3%" stopColor="green" />
          <stop offset="27.08%" stopColor="yellow" />
          <stop offset="45.4%" stopColor="yellow" />
          <stop offset="50.15%" stopColor="orange" />
          <stop offset="60.77%" stopColor="orange" />
          <stop offset="65.54%" stopColor="red" />
          <stop offset="83.85%" stopColor="red" />
          <stop offset="88.62%" stopColor="darkviolet" />
          <stop offset="100%" stopColor="darkviolet" />
        </linearGradient>
      </defs>
      <Grid
        top={margin.top}
        left={margin.left}
        xScale={xScale}
        yScale={yScale}
        width={xMax}
        height={yMax}
        className="grid-lines__line"
        numTicksRows={height > 150 ? 6 : 3}
      />
      <Group top={margin.top} left={margin.left}>
        <LinePath
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke={"url(#uvGradient)"}
          strokeWidth={2}
          curve={curveBasis}
        />
      </Group>
      <Group left={margin.left}>
        <AxisLeft
          top={margin.top}
          left={0}
          scale={yScale}
          stroke={"#1b1a1e"}
          strokeWidth={0.5}
          tickTextFill={"#1b1a1e"}
          numTicks={height > 150 ? 6 : 3}
          hideTicks={true}
          hideAxisLine={true}
          tickLabelProps={() => ({ fontSize: 12, textAnchor: "end" })}
        />
        <text x={0} y={height - 4} transform="" fontSize={12}>
          UV Index
        </text>
        />
      </Group>
    </svg>
  );
};

export default UVIndexGraph;
